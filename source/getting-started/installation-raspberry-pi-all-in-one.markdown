---
layout: page
title: "Raspberry Pi All-In-One Installer"
date: 2016-05-12 01:39
comments: true
sharing: true
footer: true
---

The "[Raspberry Pi All-In-One Installer](https://github.com/jbags81/fabric-home-assistant)" deploy a complete Home Assistant server including support for MQTT with websocket support and Z-Wave using [Fabric](http://www.fabfile.org/).

Requirements before installation:

* You have a Raspberry Pi with a fresh installation of [Raspbian Jessie/Jessie Lite](https://www.raspberrypi.org/downloads/raspbian/) or Debian 8 connected to your network.
* You are able to SSH into your Raspberry Pi.
* You have a computer with Python 3 and `git` installed.

Installation instructions (all from your PC):

 1. Install fabric: `pip3 install fabric3`
 2. Clone the repository: `git clone https://github.com/jbags81/fabric-home-assistant.git`
 3. Change the directory: `cd fabric-home-assistant`
 4. Edit the `fabfile.py` file and add the hostname or the IP address of your Raspberry Pi to `env.hosts`. If you are using Debian 8 then replace the username `pi` in the `fabfile.py` file with your Debian user as well.
 5. Build your new Home Assistant server: `fab deploy`
 6. Reboot your Raspberry Pi.

Once rebooted, your Raspberry Pi will be up and running with Home Assistant. You can access it at **http://your_raspberry_pi_ip:8123**.

The Home Assistant configuration is located at `/home/hass`. The virtualenv with the Home Assistant installation is located at `/srv/hass/hass_venv`.

The All-In-One Fabric script will do the following automatically:

*  Create all needed directories
*  Create needed service accounts
*  Install OS and Python dependencies
*  Setup a virtualenv to run Home Assistant and components inside.
*  Run as a service account
*  Install Home Assistant in a virtualenv
*  Build and install Mosquitto from source with websocket support
*  Build and Install Python-openzwave in the Home Assistant virtualenv
*  Add both Home Assistant and Mosquitto to systemd services to start at boot

Fabric allows any of the underlying functions to be ran individually as well. Run `fab -l` to see a list of all callable jobs.

