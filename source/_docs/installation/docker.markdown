---
layout: page
title: "Installation on Docker"
description: "Instructions to install Home Assistant on a Docker."
date: 2016-04-16 11:36
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-docker/
---

Installation with Docker is straightforward. Adjust the following command so that `/path/to/your/config/` points at the folder where you want to store your config and run it:

### {% linkable_title Linux %}

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant
```

### {% linkable_title macOS %}

When using `docker-ce` (or `boot2docker`) on macOS, you are unable to map the local timezone to your Docker container (see Docker issue https://github.com/docker/for-mac/issues/44). Instead of `-v /etc/localtime:/etc/localtime:ro`, just pass in the timezone environment variable when you launch the container, ex: `-e "TZ=America/Los_Angeles"`. Replace "America/Los_Angeles" with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

If you wish to browse directly to `http://localhost:8123` from your macOS host, meaning forward ports directly to the container, replace the `--net=host` switch with `-p 8123:8123`. More detail can be found in [the docker forums](https://forums.docker.com/t/should-docker-run-net-host-work/14215/10).

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -e "TZ=America/Los_Angeles" -p 8123:8123 homeassistant/home-assistant
```

Alternatively, `docker-compose` works with any recent release of `docker-ce` on macOS. Note that (further down this page) we provide an example `docker-compose.yml` however it differs from the `docker run` example above. To make the .yml directives match, you would need to make _two_ changes: first add the equivalent `ports:` directive, then _remove_ the `network_mode: host` section. This is because `Port mapping is incompatible with network_mode: host:`. More details can be found at [Docker networking docs] (https://docs.docker.com/engine/userguide/networking/#default-networks). Note also the `/dev/tty*` device name used by your Arduino etc. devices will differ from the Linux example, so the compose `mount:` may require updates.

### {% linkable_title Windows %}

When running Home Assistant in Docker on Windows, you may have some difficulty getting ports to map for routing (since the `--net=host` switch actually applies to the hypervisor's network interface). To get around this, you will need to add port proxy ipv4 rules to your local Windows machine, like so (Replacing '192.168.1.10' with whatever your Windows IP is, and '10.0.50.2' with whatever your Docker container's IP is):
```
netsh interface portproxy add v4tov4 listenaddress=192.168.1.10 listenport=8123 connectaddress=10.0.50.2 connectport=8123
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8123 connectaddress=10.0.50.2 connectport=8123
```

This will let you access your Home Assistant portal from http://localhost:8123, and if you forward port 8123 on your router to your machine IP, the traffic will be forwarded on through to the docker container.

### {% linkable_title Synology NAS %}

As Synology within DSM now supports Docker (with a neat UI), you can simply install Home Assistant using docker without the need for command-line. For details about the package (including compatibility-information, if your NAS is supported), see https://www.synology.com/en-us/dsm/app_packages/Docker

The steps would be:
* Install "Docker" package on your Synology NAS
* Launch Docker-app and move to "Registry"-section
* Find "homeassistant/home-assistant" with registry and click on "Download"
* Wait for some time until your NAS has pulled the image
* Move to the "Image"-section of the Docker-app
* Click on "Launch"
* Choose a container-name you want (e.g. "homeassistant")
* Click on "Advanced Settings"
* Set "Enable auto-restart" if you like
* Within "Volume" click on "Add Folder" and choose either an existing folder or add a new folder. The "mount point" has to be "/config", so that Home Assistant will use it for the configs and logs.
* Within "Network" select "Use same network as Docker Host"
* To ensure that Home Assistant displays the correct timezone go to the "Environment" tab and click the plus sign then add `variable` = `TZ` & `value` = `Europe/London` choosing [your correct timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
* Confirm the "Advanced Settings"
* Click on "Next" and then "Apply"
* Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Synology NAS IP address - for example `http://192.168.1.10:8123`)

Remark: to update your Home Assistant on your Docker within Synology NAS, you just have to do the following:
* Go to the Docker-app and move to "Image"-section
* Download the "homeassistant/home-assistant" image - don't care, that it is already there
* wait until the system-message/-notification comes up, that the download is finished (there is no progress bar)
* Move to "Container"-section
* Stop your container if it's running
* Right-click on it and select "Action"->"Clear". You won't lose any data, as all files are stored in your config-directory
* Start the container again - it will then boot up with the new Home Assistant image

Remark: to restart your Home Assistant within Synology NAS, you just have to do the following:
* Go to the Docker-app and move to "Container"-section
* Right-click on it and select "Action"->"Restart".

<p class='note'>
If you want to use a USB Bluetooth adapter or Z-Wave USB Stick with Home Assistant on Synology Docker these instructions do not correctly configure the container to access the USB devices. To configure these devices on your Synology Docker Home Assistant you can follow the instructions provided [here](https://philhawthorne.com/installing-home-assistant-io-on-a-synology-diskstation-nas/) by Phil Hawthorne. 
</p>

### {% linkable_title Restart %}

If you change the configuration you have to restart the server. To do that you have 2 options.

 1. You can go to the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> service developer tools, select the service `homeassistant/restart` and click "Call Service".
 2. Or you can restart it from a terminal by running `docker restart home-assistant`

### {% linkable_title Docker Compose %}

As the docker command becomes more complex, switching to `docker-compose` can be preferable and support automatically restarting on failure or system restart. Create a `docker-compose.yml` file:

```yaml
  version: '3'
  services:
    homeassistant:
      container_name: home-assistant
      image: homeassistant/home-assistant
      volumes:
        - /path/to/your/config:/config
        - /etc/localtime:/etc/localtime:ro
      restart: always
      network_mode: host
```

Then start the container with:

```bash
$ docker-compose up -d
```

### {% linkable_title Exposing Devices %}

In order to use z-wave, zigbee or other components that require access to devices, you need to map the appropriate device into the container. Ensure the user that is running the container has the correct privileges to access the `/dev/tty*` file, then add the device mapping to your docker command:

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --device /dev/ttyUSB0:/dev/ttyUSB0 --net=host homeassistant/home-assistant
```

or in a `docker-compose.yml` file:

```yaml
  version: '3'
  services:
    homeassistant:
      container_name: home-assistant
      image: homeassistant/home-assistant
      volumes:
        - /path/to/your/config:/config
        - /etc/localtime:/etc/localtime:ro
      devices:
        - /dev/ttyUSB0:/dev/ttyUSB0
        - /dev/ttyUSB1:/dev/ttyUSB1
        - /dev/ttyACM0:/dev/ttyACM0
      restart: always
      network_mode: host
```
