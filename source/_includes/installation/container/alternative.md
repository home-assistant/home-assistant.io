### Synology NAS

As Synology within DSM now supports Docker (with a neat UI), you can simply install Home Assistant using Docker without the need for command-line. For details about the package (including compatibility-information, if your NAS is supported), see <https://www.synology.com/en-us/dsm/packages/Docker>

The steps would be:

- Install "Docker" package on your Synology NAS
- Launch Docker-app and move to "Registry"-section
- Find "homeassistant/home-assistant" within registry and click on "Download". Choose the "stable" tag.
- Wait for some time until your NAS has pulled the image
- Move to the "Image"-section of the Docker-app
- Click on "Launch"
- Choose a container-name you want (e.g., "homeassistant")
- Click on "Advanced Settings"
- Set "Enable auto-restart" if you like
- Within "Volume" click on "Add Folder" and choose either an existing folder or add a new folder. The "mount path" has to be "/config", so that Home Assistant will use it for the configs and logs. It is therefore recommended that the folder you choose should be named "config" or "homeassistant/config" to avoid confusion when referencing it within service calls.
- Within "Network" select "Use same network as Docker Host"
- To ensure that Home Assistant displays the correct timezone go to the "Environment" tab and click the plus sign then add `variable` = `TZ` & `value` = `Europe/London` choosing [your correct timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Confirm the "Advanced Settings"
- Click on "Next" and then "Apply"
- Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Synology NAS IP address - for example `http://192.168.1.10:8123`)

If you are using the built-in firewall, you must also add the port 8123 to allowed list. This can be found in "Control Panel -> Security" and then the Firewall tab. Click "Edit Rules" besides the Firewall Profile dropdown box. Create a new rule and select "Custom" for Ports and add 8123. Edit Source IP if you like or leave it at default "All". Action should stay at "Allow".

To use a Z-Wave USB stick for Z-Wave control, the HA Docker container needs extra configuration to access to the USB stick. While there are multiple ways to do this, the least privileged way of granting access can only be performed via the Terminal, at the time of writing. See this page for configuring Terminal acces to your Synology NAS:

<https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal>


<div class='note'>

[See this page for accessing the Terminal via SSH](https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet)

</div>

Adjust the following Terminal command as follows :

- Replace `/PATH_TO_YOUR_CONFIG` points at the folder where you want to store your configuration
- Replace `/PATH_TO_YOUR_USB_STICK` matches the path for your USB stick (e.g., `/dev/ttyACM0` for most Synology users)
- Replace "Australia/Melbourne" with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

Run it in Terminal.  

```bash
sudo docker run --restart always -d --name homeassistant -v /PATH_TO_YOUR_CONFIG:/config --device=/PATH_TO_YOUR_USB_STICK -e TZ=Australia/Melbourne --net=host homeassistant/home-assistant:stable
```

Complete the remainder of the Z-Wave configuration by [following the instructions here.](/docs/z-wave/installation)

Remark: to update your Home Assistant on your Docker within Synology NAS, you just have to do the following:

- Go to the Docker-app and move to "Registry"-section
- Find "homeassistant/home-assistant" within registry and click on "Download". Choose the "stable" tag.
- Wait until the system-message/-notification comes up, that the download is finished (there is no progress bar)
- Move to "Container"-section
- Stop your container if it's running
- Right-click on it and select "Action"->"Clear". You won't lose any data, as all files are stored in your configuration-directory
- Start the container again - it will then boot up with the new Home Assistant image

Remark: to restart your Home Assistant within Synology NAS, you just have to do the following:

- Go to the Docker-app and move to "Container"-section
- Right-click on it and select "Action"->"Restart".

<div class='note'>

If you want to use a USB Bluetooth adapter or Z-Wave USB Stick with Home Assistant on Synology Docker these instructions do not correctly configure the container to access the USB devices. To configure these devices on your Synology Docker Home Assistant you can follow the instructions provided [here](https://philhawthorne.com/installing-home-assistant-io-on-a-synology-diskstation-nas/) by Phil Hawthorne.

</div>

### QNAP NAS

As QNAP within QTS now supports Docker (with a neat UI), you can simply install Home Assistant using Docker without the need for command-line. For details about the package (including compatibility-information, if your NAS is supported), see <https://www.qnap.com/solution/container_station/en/index.php>

The steps would be:

- Install "Container Station" package on your Qnap NAS
- Launch Container Station and move to "Create Container"-section
- Search image "homeassistant/home-assistant" with Docker Hub and click on "Install"
  Make attention to CPU architecture of your NAS. For ARM CPU types the correct image is "homeassistant/armhf-homeassistant"
- Choose "stable" version and click next
- Choose a container-name you want (e.g., "homeassistant")
- Click on "Advanced Settings"
- Within "Shared Folders" click on "Volume from host" > "Add" and choose either an existing folder or add a new folder. The "mount point has to be `/config`, so that Home Assistant will use it for the configuration and logs.
- Within "Network" and select Network Mode to "Host"
- To ensure that Home Assistant displays the correct timezone go to the "Environment" tab and click the plus sign then add `variable` = `TZ` & `value` = `Europe/London` choosing [your correct timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Click on "Create"
- Wait for some time until your NAS has created the container
- Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Qnap NAS IP address - for example `http://192.xxx.xxx.xxx:8123`)

Remark: To update your Home Assistant on your Docker within Qnap NAS, you just remove container and image and do steps again (Don't remove "config" folder).

If you want to use a USB Bluetooth adapter or Z-Wave USB stick with Home Assistant on Qnap Docker, follow those steps:

#### Z-Wave

- Connect to your NAS over SSH
- Load cdc-acm kernel module(when NAS restart need to run this command)
  `insmod /usr/local/modules/cdc-acm.ko`
- Find USB devices attached. Type command:
  `ls /dev/tty*`
  The above command should show you any USB devices plugged into your NAS. If you have more than one, you may get multiple items returned. Like : `ttyACM0`
  
- Run Docker command:

  ```bash
  docker run --init --name homeassistant --net=host --privileged -itd -v /share/CACHEDEV1_DATA/Public/homeassistant/config:/config -e TZ=Europe/London --device /dev/ttyACM0 homeassistant/home-assistant:stable
  ```
  
  `-v` is your configuration path
  `-e` is set timezone
  
- Edit `configuration.yaml`

```yaml
zwave:
  usb_path: /dev/ttyACM0
```

That will tell Home Assistant where to look for our Z-Wave radio.

#### Bluetooth

- Connect to your NAS over SSH
- Run Docker command:

  ```bash
  docker run --init --name homeassistant --net=host --privileged -itd -v /share/CACHEDEV1_DATA/Public/homeassistant/config:/config -e TZ=Europe/London -v /dev/bus/usb:/dev/bus/usb -v /var/run/dbus:/var/run/dbus homeassistant/home-assistant:stable
  ```
  
  First `-v` is your configuration path
  `-e` is set timezone
  
- Edit the `configuration.yaml` file

```yaml
device_tracker:
  - platform: bluetooth_tracker
```