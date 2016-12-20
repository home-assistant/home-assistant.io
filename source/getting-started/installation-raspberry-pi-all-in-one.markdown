---
layout: page
title: "Raspberry Pi All-In-One Installer"
date: 2016-05-12 01:39
comments: false
sharing: true
footer: true
---

The [Raspberry Pi All-In-One Installer](https://github.com/home-assistant/fabric-home-assistant) deploys a complete Home Assistant server including support for MQTT with websockets, Z-Wave, and the Open-Zwave Control Panel.

The only requirement is that you have a Raspberry Pi with a fresh installation of [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/) connected to your network.

*  Login to Raspberry Pi. For example with `ssh pi@your_raspberry_pi_ip`
*  Run the following command

```bash
$ wget -Nnv https://raw.githubusercontent.com/home-assistant/fabric-home-assistant/master/hass_rpi_installer.sh && bash hass_rpi_installer.sh
```
<p class='note warning'>
  Note this command is one-line and not run as sudo.
</p>

Installation will take approx. 1-2 hours depending on the Raspberry Pi model the installer is being run against. The installer will identitfy what Raspberry PI hardware revision you are using and adjust commands accordingly. A complete log of the install is located at: `/home/pi/fabric-home-assistant/installation_report.txt` The installer has been updated to simply log any errors encountered, but resume installing. Please consult the "installation report" if your install encountered issues. 

[BRUH automation](http://www.bruhautomation.com) has created [a tutorial video](https://www.youtube.com/watch?v=VGl3KTrYo6s) explaining how to install Raspbian on your Raspberry Pi and install Home Assistant using the All-In-One Installer.

Once rebooted, your Raspberry Pi will be up and running with Home Assistant. You can access it at [http://your_raspberry_pi_ip:8123](http://your_raspberry_pi_ip:8123).

The Home Assistant configuration is located at `/home/hass/.homeassistant`. The [virtualenv](https://virtualenv.pypa.io/en/latest/) with the Home Assistant installation is located at `/srv/hass/hass_venv`. As part of the secure installation, a new user (**hass**) is added to your Raspberry Pi to run Home Assistant. This is a system account and does not have login or other abilities by design. When editing your `configuration.yaml` files, you will need to run the commands with `sudo` or by switching user.

<p class='note note'>
  *Windows users*: Setting up WinSCP to allow this seemlessly is at the end of this page.
</p>

By default, installation makes use of a Python Virtualenv. If you wish to not follow this recommendation, you may add the flag `-n` to the end of the install command specified above.

The All-In-One Installer script will do the following automatically:

*  Create all needed directories
*  Create needed service accounts
*  Install OS and Python dependencies
*  Setup a python virtualenv to run Home Assistant and components inside.
*  Run as `hass` service account
*  Install Home Assistant in a virtualenv
*  Build and install Mosquitto v1.4.9 from source with websocket support running on ports 1883 and 9001
*  Build and Install Python-openzwave in the Home Assistant virtualenv
*  Build openzwave-control-panel in `/srv/hass/src/open-zwave-control-panel`
*  Add both Home Assistant and Mosquitto to systemd services to start at boot

### {% linkable_title Upgrading %}

To upgrade the All-In-One setup manually:

*  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
*  Change to hass user `sudo su -s /bin/bash hass`
*  Change to virtual enviroment `source /srv/hass/hass_venv/bin/activate`
*  Update HA `pip3 install --upgrade homeassistant`
*  Type `exit` to logout the hass user and return to the `pi` user.
  
To upgrade with fabric:

*  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
*  Change to `cd ~/fabric-home-assistant`
*  Run `fab upgrade_homeassistant`
  
After upgrading, you can restart Home Assistant a few different ways:

* Restarting the Raspberry Pi `sudo reboot`
* Restarting the Home-Assistant Service `sudo systemctl restart home-assistant.service`

### {% linkable_title To change the MQTT default password %} 
 
*  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
*  Change password `sudo mosquitto_passwd /etc/mosquitto/pwfile pi`
*  Restart mosquitto `sudo systemctl restart mosquitto.service`
*  Be sure to update your `configuration.yaml` to reflect the new password.

### {% linkable_title Using the OZWCP web application %}

To launch the OZWCP web application:

*  Make sure Home Assistant is not running! So stop that first
*  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
*  Change to the ozwcp directory `cd /srv/hass/src/open-zwave-control-panel/`
*  Launch the control panel `sudo ./ozwcp -p 8888`
*  Open a web browser to `http://your_pi_ip:8888`
*  Specify your zwave controller, for example `/dev/ttyACM0` and hit initialize

<p class='note warning'>
  Don't check the USB box regardless of using a USB based device.
</p>

### {% linkable_title Using the GPIOs %}

Please note that if you are using any components for Home Assistant that would use the GPIOs on the RPI, you will need to grant the default AiO user `hass` access to the GPIOs.  Run the following command `sudo adduser hass gpio` while in a terminal session on your Pi.  This is a one time configuration change to allow All In One Installer based Home Assistant access to the GPIOs.

### {% linkable_title WinSCP %}

If you are Windows users who is using [WinSCP](https://winscp.net/), please note that after running the installer, you will need to modify settings allowing you to "switch users" to edit your configuration files. The needed change within WinSCP is: **Environment** -> **SCP/Shell** -> **Shell** and set it to `sudo su -`.
