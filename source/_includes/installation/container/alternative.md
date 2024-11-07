### Synology NAS

Synology with DSM now supports container management through the Container Manager package, allowing you to install Home Assistant without the need for command-line. For details about the package (including compatibility-information, if your NAS is supported), see <https://www.synology.com/en-us/dsm/packages/ContainerManager>
The steps would be:

- Install Docker "Container Manager" package on your Synology NAS
- Launch Container Manager-app and move to "Registry"-section
- Find "homeassistant/home-assistant" within registry and click on "Download". Choose the "stable" tag.
- Wait for some time until your NAS has pulled the image
- Move to the "Image"-section of the "Container Manager"-app
- Click on "Launch"
- Within "Network" select "Use same network as Docker Host" and click Next
- Choose a container-name you want (e.g., "homeassistant")
- Set "Enable auto-restart" if you like
- Click on "Advanced Settings". To ensure that Home Assistant displays the correct timezone go to the "Environment" tab and click the plus sign then add `variable` = `TZ` & `value` = `Europe/London` choosing [your correct timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Click Save to exit Advanced Settings.
- Click Next
- Within "Volume Settings" click on "Add Folder" and choose either an existing folder or add a new folder (e.g. in "docker" shared folder, add new folder named "homeassistant" and then within that new folder add another new folder "config"), then click Select. Then edit the "mount path" to be "/config". This configures where Home Assistant will store configs and logs.
- Ensure "Run this container after the wizard is finished" is checked and click Done
- Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Synology NAS IP address - for example `http://192.168.1.10:8123`)

If you are using the built-in firewall, you must also add the port 8123 to allowed list. This can be found in "Control Panel -> Security" and then the Firewall tab. Click "Edit Rules" besides the Firewall Profile dropdown box. Create a new rule and select "Custom" for Ports and add 8123. Edit Source IP if you like or leave it at default "All". Action should stay at "Allow".

To use a Z-Wave USB stick for Z-Wave control, the HA Docker container needs extra configuration to access to the USB stick. While there are multiple ways to do this, the least privileged way of granting access can only be performed via the Terminal, at the time of writing. See this page for configuring Terminal access to your Synology NAS:

<https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal>


{% tip %}
[See this page for accessing the Terminal via SSH](https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet)
{% endtip %}

Adjust the following Terminal command as follows :

- Replace `/PATH_TO_YOUR_CONFIG` points at the folder where you want to store your configuration -  make sure that you keep the `:/config` part
- Replace `/PATH_TO_YOUR_USB_STICK` matches the path for your USB stick (e.g., `/dev/ttyACM0` for most Synology users)
- Replace "Australia/Melbourne" with [your timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

Run it in Terminal.

```bash
sudo docker run --restart always -d --name homeassistant -v /PATH_TO_YOUR_CONFIG:/config --device=/PATH_TO_YOUR_USB_STICK -e TZ=Australia/Melbourne --net=host {{ site.installation.container }}:stable
```

Complete the remainder of the Z-Wave configuration by [following the instructions here.](/integrations/zwave_js)

Remark: to update your Home Assistant on your Docker within Synology NAS, you just have to do the following:

- Go to the "Container Manager"-app and move to "Image"-section
- Find "homeassistant/home-assistant" within Image and click on "Update".
- Wait until the system-message/-notification comes up, that the download is finished (there is no progress bar)
- Move to "Container"-section
- Stop your container if it's running
- Right-click on it and select "Action"->"Reset". You won't lose any data, as all files are stored in your configuration-directory
- Start the container again - it will then boot up with the new Home Assistant image

Remark: to restart your Home Assistant within Synology NAS, you just have to do the following:

- Go to the "Container Manager"-app and move to "Container"-section
- Right-click on it and select "Action"->"Restart".

{% note %}

If you want to use a USB Bluetooth adapter or Z-Wave USB Stick with Home Assistant on Synology Docker these instructions do not correctly configure the container to access the USB devices. To configure these devices on your Synology Docker Home Assistant you can follow the instructions provided [here](https://philhawthorne.com/installing-home-assistant-io-on-a-synology-diskstation-nas/) by Phil Hawthorne.

{% endnote %}

### QNAP NAS

QNAP with QTS supports Docker, allowing you to install Home Assistant using Docker without the need for command-line. For details about the package (including compatibility-information, if your NAS is supported), see <https://www.qnap.com/solution/container_station/en/index.php>

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
- To ensure that Home Assistant displays the correct timezone go to the "Environment" tab and click the plus sign then add `variable` = `TZ` & `value` = `Europe/London` choosing [your correct timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Click on "Create"
- Wait for some time until your NAS has created the container
- Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Qnap NAS IP address - for example `http://192.xxx.xxx.xxx:8123`)

Remark: To update your Home Assistant on your Docker within Qnap NAS, you just remove container and image and do steps again (Don't remove "config" folder).
