---
title: "Installation on Docker"
description: "Instructions to install Home Assistant on a Docker."
redirect_from: /getting-started/installation-docker/
---

<div class='note warning'>

These below instructions are for an installation of Home Assistant Core running in your own Docker environment, which you manage yourself.

Note that Docker command line option `--net=host` or the compose file equivalent `network_mode: host` must be used to put put Home Assistant on the host's network, otherwise certain functionality - including mDNS and UPnP - will break. The `-p` command line option or the compose file equivalent `ports:` is not compatible with host networking mode and must not be used.

</div>

## Platform Installation

Installation with Docker is straightforward. Adjust the following command so that `/PATH_TO_YOUR_CONFIG` points at the folder where you want to store your configuration and run it:

### Linux

```bash
docker run --init -d --name="home-assistant" -e "TZ=America/New_York" -v /PATH_TO_YOUR_CONFIG:/config --net=host homeassistant/home-assistant:stable
```

### Raspberry Pi 3 (Raspbian)

```bash
docker run --init -d --name="home-assistant" -e "TZ=America/New_York" -v /PATH_TO_YOUR_CONFIG:/config --net=host homeassistant/raspberrypi3-homeassistant:stable
```

You need to replace `/PATH_TO_YOUR_CONFIG` with your path to the configuration, for example if you choose your configuration path to be `/home/pi/homeassistant`, then command would be:

```bash
docker run --init -d --name="home-assistant" -e "TZ=America/New_York" -v /home/pi/homeassistant:/config --net=host homeassistant/raspberrypi3-homeassistant:stable
```

### macOS

When using `docker-ce` (or `boot2docker`) on macOS, you are unable to map the local timezone to your Docker container ([Docker issue](https://github.com/docker/for-mac/issues/44)). Instead of `-v /etc/localtime:/etc/localtime:ro`, just pass in the timezone environment variable when you launch the container, e.g, `-e "TZ=America/Los_Angeles"`. Replace "America/Los_Angeles" with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```bash
docker run --init -d --name="home-assistant" -e "TZ=America/Los_Angeles" -v /PATH_TO_YOUR_CONFIG:/config -p 8123:8123 homeassistant/home-assistant:stable
```

Alternatively, `docker-compose` works with any recent release of Docker CE on macOS. Note the `/dev/tty*` device name used by your Arduino etc. devices will differ from the Linux example, so the compose `mount:` may require updates.

### Windows

Docker containers are completely isolated from its Windows host system. So when you delete a container, all the changes you made to that container are also removed. If you want to have configuration files or other assets remain persistent, try mounting Windows folders on containers.

Before proceeding, make sure you have shared out a drive for Docker to mount to. This will allow the saving of configuration files to persist on the local machine rather than in the Docker container (which may be destroyed when upgraded).

<https://docs.docker.com/docker-for-windows/#shared-drives>
<https://docs.docker.com/docker-for-windows/troubleshoot/#verify-domain-user-has-permissions-for-shared-drives-volumes>

```powershell
docker run --init -d --name="home-assistant" -e "TZ=America/Los_Angeles" -v /PATH_TO_YOUR_CONFIG:/config --net=host homeassistant/home-assistant:stable
```

It’s easier to understand the trick when put into practice. Here we would like to mount a current working directory (something like `C:\Users\<your login name>\homeassistant` make sure this exists first) into the `homeassistant/home-assistant:stable` image at the `/config` location in the container. We would do that as so:

```powershell
docker run --init -d --name="home-assistant" -e "TZ=America/Los_Angeles" -v //c/Users/<your login name>/homeassistant:/config --net=host homeassistant/home-assistant:stable
```

When running Home Assistant in Docker on Windows, you may have some difficulty getting ports to map for routing (since the `--net=host` switch actually applies to the hypervisor's network interface). To get around this, you will need to add port proxy ipv4 rules to your local Windows machine, like so (Replacing '192.168.1.10' with whatever your Windows IP is, and '10.0.50.2' with whatever your Docker container's IP is):

```bash
netsh interface portproxy add v4tov4 listenaddress=192.168.1.10 listenport=8123 connectaddress=10.0.50.2 connectport=8123
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8123 connectaddress=10.0.50.2 connectport=8123
```

This will let you access your Home Assistant portal from `http://localhost:8123`, and if you forward port 8123 on your router to your machine IP, the traffic will be forwarded on through to the Docker container.

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

See this page for accessing the Terminal via SSH:

<https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet>

Adjust the following Terminal command as follows :

- Replace `/PATH_TO_YOUR_CONFIG` points at the folder where you want to store your configuration
- Replace `/PATH_TO_YOUR_USB_STICK` matches the path for your USB stick (e.g., `/dev/ttyACM0` for most Synology users)
- Replace "Australia/Melbourne" with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

Run it in Terminal.  

```bash
sudo docker run --restart always -d --name="homeassistant" -v /PATH_TO_YOUR_CONFIG:/config --device=/PATH_TO_YOUR_USB_STICK -e TZ=Australia/Melbourne --net=host homeassistant/home-assistant:stable
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
  docker run --init --name home-assistant --net=host --privileged -itd -v /share/CACHEDEV1_DATA/Public/homeassistant/config:/config -e TZ=Europe/London --device /dev/ttyACM0 homeassistant/home-assistant:stable
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
  docker run --init --name home-assistant --net=host --privileged -itd -v /share/CACHEDEV1_DATA/Public/homeassistant/config:/config -e TZ=Europe/London -v /dev/bus/usb:/dev/bus/usb -v /var/run/dbus:/var/run/dbus homeassistant/home-assistant:stable
  ```
  
  First `-v` is your configuration path
  `-e` is set timezone
  
- Edit the `configuration.yaml` file

```yaml
device_tracker:
  - platform: bluetooth_tracker
```

## Restart

If you change the configuration you have to restart the server. To do that you have 2 options.

 1. You can go to the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> service developer tools, select the service `homeassistant/restart` and click "Call Service".
 2. Or you can restart it from a terminal by running `docker restart home-assistant`

## Docker Compose

As the Docker command becomes more complex, switching to `docker-compose` can be preferable and support automatically restarting on failure or system restart. Create a `docker-compose.yml` file:

```yaml
  version: '3'
  services:
    homeassistant:
      container_name: home-assistant
      image: homeassistant/home-assistant:stable
      volumes:
        - /PATH_TO_YOUR_CONFIG:/config
      environment:
        - TZ=America/New_York
      restart: always
      network_mode: host
```

Then start the container with:

```bash
docker-compose up -d
```

To restart Home Assistant when you have changed configuration:

```bash
docker-compose restart
```

## Exposing Devices

In order to use Z-Wave, Zigbee or other integrations that require access to devices, you need to map the appropriate device into the container. Ensure the user that is running the container has the correct privileges to access the `/dev/tty*` file, then add the device mapping to your Docker command:

```bash
$ docker run --init -d --name="home-assistant" -v /PATH_TO_YOUR_CONFIG:/config \
   -e "TZ=Australia/Melbourne" --device /dev/ttyUSB0:/dev/ttyUSB0 \
   --net=host homeassistant/home-assistant:stable
```

or in a `docker-compose.yml` file:

```yaml
  version: '3'
  services:
    homeassistant:
      container_name: home-assistant
      image: homeassistant/home-assistant:stable
      volumes:
        - /PATH_TO_YOUR_CONFIG:/config
      devices:
        - /dev/ttyUSB0:/dev/ttyUSB0
        - /dev/ttyUSB1:/dev/ttyUSB1
        - /dev/ttyACM0:/dev/ttyACM0
      environment:
        - TZ=America/New_York
      restart: always
      network_mode: host
```

<div class='note'>

On Mac, USB devices are [not passed through](https://github.com/docker/for-mac/issues/900) by default. Follow the instructions in [Using USB with Docker for Mac](https://dev.to/rubberduck/using-usb-with-docker-for-mac-3fdd) by Christopher McClellan if your device is not showing up.

</div>
