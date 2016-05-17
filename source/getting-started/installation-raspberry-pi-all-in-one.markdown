---
layout: page
title: "Raspberry Pi All-In-One Installer"
date: 2016-05-12 01:39
comments: true
sharing: true
footer: true
---

The "[Raspberry Pi All-In-One Installer](https://github.com/home-assistant/fabric-home-assistant)" deploys a complete Home Assistant server including support for MQTT with websocket support, Z-Wave, and the Open-Zwave-Control-Panel.

Requirements before installation:

* You have a Raspberry Pi with a fresh installation of [Raspbian Jessie/Jessie Lite](https://www.raspberrypi.org/downloads/raspbian/) connected to your network.
* You are able to SSH into your Raspberry Pi.


Installation instructions:

 1. SSH into your Raspberry Pi
 2. Run `wget -Nnv https://raw.githubusercontent.com/home-assistant/fabric-home-assistant/master/hass_rpi_installer.sh && bash hass_rpi_installer.sh;`
 3. Installation will take approx 1-2 hour's depending on the model of Raspberry Pi the installer is being run against.


Once rebooted, your Raspberry Pi will be up and running with Home Assistant. You can access it at **http://your_raspberry_pi_ip:8123**.

The Home Assistant configuration is located at `/home/hass`. The virtualenv with the Home Assistant installation is located at `/srv/hass/hass_venv`. As part of the secure installation, a new user is added to your Raspberry Pi to run Home Assistant as named, "hass". This is a system account and does not have login or other abilities by design. When editing your configuration.yaml files, you will need to run the commands as "Sudo" or switching users. Setting up WinSCP to allow this seemlessly is detailed below.

By default, installation makes use of a Python Virtualenv. If you wish to not follow this recommendation, you may add the flag `-n` to the end of the install command specified above. 

The All-In-One installer script will do the following automatically:

*  Create all needed directories
*  Create needed service accounts
*  Install OS and Python dependencies
*  Setup a python virtualenv to run Home Assistant and components inside.
*  Run as `hass` service account
*  Install Home Assistant in a virtualenv
*  Build and install Mosquitto from source with websocket support running on ports 1883 and 9001
*  Build and Install Python-openzwave in the Home Assistant virtualenv
*  Build openzwave-control-panel in `/srv/hass/src/open-zwave-control-panel`
*  Add both Home Assistant and Mosquitto to systemd services to start at boot



Windows Users - Please note that after running the installer, you will need to modify a couple settings allowing you to "switch users" to edit your configuration files. The needed change within WinSCP can be seen here: [Imgur](http://i.imgur.com/tlOljo6.jpg)

