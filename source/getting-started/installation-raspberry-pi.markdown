---
layout: page
title: "Manual installation on a Raspberry Pi"
description: "Instructions to install Home Assistant on a Raspberry Pi runnning Raspbian Lite."
date: 2016-09-05 16:00
sidebar: true
comments: false
sharing: true
footer: true
---

### {% linkable_title Installation %}

There's currently three documented ways to install Home Assistant on a Raspberry Pi.  
 - [Manual installation](/getting-started/installation-raspberry-pi/#manual-installation). Following this guide doing each step manually. This is highly recommended as a first installation since you get a good overview of the installation.
 - [Hassbian image](/getting-started/installation-raspberry-pi-image). Basic installation with the same settings as following the manual installation guide. Some additional software is preinstalled to make installation quicker and easier. Installation uses `homeassistant` user.
 - [All-in-One Installer](/getting-started/installation-raspberry-pi-all-in-one/). Fabric based installation script that installs and compiles many of the things an advanced Home Assistant install is likely to need. Installation uses `homeassistant` user.
 
 <p class='note note'>
  Since each installation type uses a different user for Home Assistant, be sure to note and use the correct username for the `adduser` commands listed below for camera and GPIO extensions.
</p>


### {% linkable_title Manual Installation %}

This installation of Home Assistant requires the Raspberry Pi to run [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/).
The installation will be installed in a [Virtual Environment](/getting-started/installation-virtualenv) with minimal overhead. Instructions assume this is a new installation of Raspbian Lite.

Connect to the Raspberry Pi over ssh. Default password is `raspberry`.
```bash
$ ssh pi@ipadress
```

Changing the default password is encouraged.
```bash
$ passwd
```

Update the system.
```bash
$ sudo apt-get update
$ sudo apt-get upgrade -y
```

Install the dependencies.
```bash
$ sudo apt-get install python3 python3-venv python3-pip
```

Add an account for Home Assistant called `homeassistant`.  
Since this account is only for running Home Assistant the extra arguments of `-rm` is added to create a system account and create a home directory.
```bash
$ sudo useradd -rm homeassistant
```

Next we will create a directory for the installation of Home Assistant and change the owner to the `homeassistant` account.
```bash
$ cd /srv
$ sudo mkdir homeassistant
$ sudo chown homeassistant:homeassistant homeassistant
```

Next up is to create and change to a virtual environment for Home Assistant. This will be done as the `homeassistant` account.
```bash
$ sudo su -s /bin/bash homeassistant 
$ cd /srv/homeassistant
$ python3 -m venv homeassistant_venv
$ source /srv/homeassistant/homeassistant_venv/bin/activate
```
Once you have activated the virtual environment you will notice the prompt change and then you can install Home Assistant.
```bash
(homeassistant_venv) homeassistant@raspberrypi:/srv/homeassistant $ pip3 install homeassistant
```

Start Home Assistant for the first time. This will complete the installation, create the `.homeasssistant` configuration directory in the `/home/homeassistant` directory and install any basic dependencies.
```bash
(homeassistant_venv) $ hass
```

You can now reach your installation on your raspberry pi over the web interface on [http://ipaddress:8123](http://ipaddress:8123). 
For instruction on how to configure Home Assistant continue on with [Configuring Home Assistant](/getting-started/configuration/).

### {% linkable_title Raspberry Pi Hardware Specific Components %}

Some components that are specific for the Raspberry Pi can require some further configuration outside of Home Assistant. All commands below are assumed to be executed with the `pi` account. For full documentation of these components refer to the [components](/components) page.

### {% linkable_title Bluetooth Tracker %}
The Bluetooth tracker will work on a Raspberry Pi 3 with the built-in Bluetooth module or with a USB Bluetooth device on any of the other Raspberry Pi's.   

Install the following external dependencies.
```bash
$ sudo apt-get install bluetooth libbluetooth-dev
```
After this follow the [Bluetooth Tracker component](/components/device_tracker.bluetooth_tracker/) and [Device Tracker page](/components/device_tracker/) pages.


### {% linkable_title Raspberry Pi Camera %}
The Raspberry Pi Camera is a specific camera for the Raspberry Pi boards. For more information about the camera I suggest reading the [documentation](https://www.raspberrypi.org/documentation/usage/camera/) from the Raspberry Pi foundation.  

To use the camera it needs to be enabled with the `raspi-config` utility.
```bash
$ sudo raspi-config
```
Select `Enable camera` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.  
After reboot add your `homeassistant` account to the `video` group.
```bash
$ sudo adduser homeassistant video
```
After this follow the [Raspberry Pi Camera component](/components/camera.rpi_camera/) page.

### {% linkable_title Raspberry Pi GPIO %}
Each of the following devices are connected to the GPIO pins on the Raspberry Pi.
For more details about the GPIO layout, visit the [documentation](https://www.raspberrypi.org/documentation/usage/gpio/) from the Raspberry 
Pi foundation.  
Since these are not normally used some extra permission will need to be added.
In general the permission that is needed is granted by adding the `homeassistant` account to the `gpio` group.


#### {% linkable_title Raspberry Pi Cover %}
Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry Pi Cover component](/components/cover.rpi_gpio/) page.

#### {% linkable_title DHT Sensor %}
Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [DHT Sensor component](/components/sensor.dht/) page.


#### {% linkable_title Raspberry PI GPIO Binary Sensor %}
Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry PI GPIO Binary Sensor component](/components/binary_sensor.rpi_gpio/) page.

#### {% linkable_title Raspberry PI GPIO Switch %}
Add your `homeassistant` account to the `gpio` group.
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry PI GPIO Switch component](/components/switch.rpi_gpio/) page.

#### {% linkable_title Raspberry Pi RF Switch %}
Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry Pi RF Switch component](/components/switch.rpi_rf/) page.

#### {% linkable_title One wire Sensor %}
The One wire sensor requires that support for it is enabled on the Raspberry Pi and that the One Wire device is connected to GPIO pin 4.
To enable One Wire support add the following line to the end of `/boot/config.txt`
```yaml
dtoverlay=w1-gpio
```
After this follow the [One Wire Sensor component](/components/sensor.onewire/) page.

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### {% linkable_title What's next %}

If you want to have Home Assistant start on boot, [autostart instructions can be found here](/getting-started/autostart-systemd/).

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
