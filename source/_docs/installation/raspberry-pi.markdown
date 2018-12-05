---
layout: page
title: "Manual installation on a Raspberry Pi"
description: "Instructions to install Home Assistant on a Raspberry Pi running Raspbian Lite."
date: 2018-06-03 11:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-raspberry-pi/
---

This installation of Home Assistant requires the Raspberry Pi to run [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/). The installation will be installed in a [Virtual Environment](/docs/installation/virtualenv) with minimal overhead. Instructions assume this is a new installation of Raspbian Lite.

You must have Python 3.5.3 or later installed (including the package `python3-dev`) which is the case for Raspbian Stretch.

<p class='note'>
Although these installation steps specifically mention a Raspberry Pi, you can go ahead and proceed on any Linux install as well.  This guide is also referred to as the "Advanced Guide" for a virtual environment install.
</p>

<p class='note warning'>
Please remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.org/help/faqs/#powerReqs) with your Pi. Mobile chargers may not be suitable, since some are designed to only provide the full power with that manufacturer's handsets. USB ports on your computer also will not supply enough power and must not be used.
</p>

Connect to the Raspberry Pi over SSH. Default password is `raspberry`.
You will need to enable SSH access. The Raspberry Pi website has instructions [here](https://www.raspberrypi.org/documentation/remote-access/ssh/).

```bash
$ ssh pi@ipaddress
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
Since this account is only for running Home Assistant the extra arguments of `-rm` is added to create a system account and create a home directory. The arguments `-G dialout,gpio` adds the user to the `dialout` and the `gpio` group. The first is required for using Z-Wave and Zigbee controllers, while the second is required to communicate with Raspberry's GPIO.

```bash
$ sudo useradd -rm homeassistant -G dialout,gpio
```

Next we will create a directory for the installation of Home Assistant and change the owner to the `homeassistant` account.

```bash
$ cd /srv
$ sudo mkdir homeassistant
$ sudo chown homeassistant:homeassistant homeassistant
```

Next up is to create and change to a virtual environment for Home Assistant. This will be done as the `homeassistant` account.

```bash
$ sudo -u homeassistant -H -s
$ cd /srv/homeassistant
$ python3 -m venv .
$ source bin/activate
```
Once you have activated the virtual environment (notice the prompt change) you will need to run the following command to install a required python package.

```bash
(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $ python3 -m pip install wheel
```

Once you have installed the required python package it is now time to install Home Assistant!

```bash
(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $ pip3 install homeassistant
```

Start Home Assistant for the first time. This will complete the installation for you, automatically creating the `.homeassistant` configuration directory in the `/home/homeassistant` directory, and installing any basic dependencies.

```bash
(homeassistant) $ hass
```
You can now reach your installation on your Raspberry Pi over the web interface on [http://ipaddress:8123](http://ipaddress:8123).

<p class='note'>
When you run the `hass` command for the first time, it will download, install and cache the necessary libraries/dependencies. This procedure may take anywhere between 5 to 10 minutes. During that time, you may get "site cannot be reached" error when accessing the web interface. This will only happen for the first time, and subsequent restarts will be much faster.
</p>

If you want to setup `hass` as a daemon and autostart it on boot please refer to [Autostart Home Assistant](/docs/autostart/).

### {% linkable_title Updating %}

To update to the latest version of Home Assistant follow these simple steps:

```bash
$ sudo -u homeassistant -H -s
$ source /srv/homeassistant/bin/activate
$ pip3 install --upgrade homeassistant
```

Once the last command executes restart the Home Assistant service to apply the latest updates.  Please keep in mind that some updates may take longer to boot up than others.  If Home Assistant fails to start make sure you check the **Breaking Changes** from the [Release Notes](https://github.com/home-assistant/home-assistant/releases).

### {% linkable_title Activating the virtual environment %}

When instructions tell you to activate the virtual environment, the following commands will do this:

```bash
$ sudo -u homeassistant -H -s
$ source /srv/homeassistant/bin/activate
```
