---
layout: page
title: "Manual installation on a Raspberry Pi"
description: "Instructions to install Home Assistant on a Raspberry Pi running Raspbian Lite."
date: 2016-09-05 16:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-raspberry-pi/
---

This installation of Home Assistant requires the Raspberry Pi to run [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/). The installation will be installed in a [Virtual Environment](/docs/installation/virtualenv) with minimal overhead. Instructions assume this is a new installation of Raspbian Lite.

Connect to the Raspberry Pi over SSH. Default password is `raspberry`.
You will need to enable SSH access. The Raspberry Pi website has instructions [here](https://www.raspberrypi.org/documentation/remote-access/ssh/).

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

Start Home Assistant for the first time. This will complete the installation, create the `.homeassistant` configuration directory in the `/home/homeassistant` directory and install any basic dependencies.

```bash
(homeassistant) $ hass
```
You can now reach your installation on your Raspberry Pi over the web interface on [http://ipaddress:8123](http://ipaddress:8123).

<p class='note'>
When you run the `hass` command for the first time, it will download, install and cache the necessary libraries/dependencies. This procedure may take anywhere between 5 to 10 minutes. During that time, you may get "site cannot be reached" error when accessing the web interface. This will only happen for the first time, and subsequent restarts will be much faster.
</p>

If you want setup `hass` as adaemon and autostart it on boot please refert to [https://home-assistant.io/docs/autostart/](Autostart Home Assistant).

