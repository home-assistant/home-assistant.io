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

This installation of Home Assistant requires the Raspberry Pi to run [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/).
The installation will be installed in a [Virtual Environment](/getting-started/installation-virtualenv) with minimal overhead. Instructions assume this is a new installation of Raspbian Lite.

Connect to the Raspberry Pi over ssh. Default password is `raspberry`.
You will need to enable ssh access. The raspberry pi website has instructions [here](https://www.raspberrypi.org/documentation/remote-access/ssh/).
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
$ python3 -m venv .
$ source bin/activate
```
Once you have activated the virtual environment you will notice the prompt change and then you can install Home Assistant.
```bash
(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $ pip3 install homeassistant
```

Start Home Assistant for the first time. This will complete the installation, create the `.homeasssistant` configuration directory in the `/home/homeassistant` directory and install any basic dependencies.
```bash
(homeassistant) $ hass
```

You can now reach your installation on your raspberry pi over the web interface on [http://ipaddress:8123](http://ipaddress:8123).

For instruction on how to configure Home Assistant continue on with [Configuring Home Assistant](/getting-started/configuration/).

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
