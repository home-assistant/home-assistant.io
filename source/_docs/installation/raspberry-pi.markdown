---
title: "Manual installation on a Raspberry Pi"
description: "Instructions to install Home Assistant Core on a Raspberry Pi running Raspberry Pi OS Lite."
---

This installation of Home Assistant Core requires the Raspberry Pi to run [Raspberry Pi OS Lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/). The installation will be installed in a [Virtual Environment](/docs/installation/virtualenv) with minimal overhead. Instructions assume this is a new installation of Raspberry Pi OS Lite.

You must have Python 3.8 or later installed (including the package `python3-dev`) which is *not* the case for Raspberry Pi OS and you will need to install Python manually.

<div class='note'>
Although these installation steps specifically mention a Raspberry Pi, you can go ahead and proceed on any Linux install as well. This guide is also referred to as the "Advanced Guide" for a virtual environment install.
</div>

<div class='note warning'>

Please remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.org/documentation/faqs/#pi-power) with your Pi. Mobile chargers may not be suitable, since some are designed to only provide the full power with that manufacturer's handsets. USB ports on your computer also will not supply enough power and must not be used.

</div>

Connect to the Raspberry Pi over SSH. Default password is `raspberry`.
You will need to enable SSH access. The Raspberry Pi website has instructions [here](https://www.raspberrypi.org/documentation/remote-access/ssh/).

```bash
ssh pi@ipaddress
```

Changing the default password is encouraged.

```bash
passwd
```

Update the system.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

Install the dependencies.

```bash
sudo apt-get install python3 python3-dev python3-venv python3-pip libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libtiff5
```

Add an account for Home Assistant Core called `homeassistant`.
Since this account is only for running Home Assistant Core the extra arguments of `-rm` is added to create a system account and create a home directory. The arguments `-G dialout,gpio,i2c` adds the user to the `dialout`, `gpio` and the `i2c` group. The first is required for using Z-Wave and Zigbee controllers, while the second is required to communicate with Raspberry's GPIO.

```bash
sudo useradd -rm homeassistant -G dialout,gpio,i2c
```

Next we will create a directory for the installation of Home Assistant Core and change the owner to the `homeassistant` account.

```bash
cd /srv
sudo mkdir homeassistant
sudo chown homeassistant:homeassistant homeassistant
```

Next up is to create and change to a virtual environment for Home Assistant Core. This will be done as the `homeassistant` account.

```bash
sudo -u homeassistant -H -s
cd /srv/homeassistant
python3 -m venv .
source bin/activate
```

Once you have activated the virtual environment (notice the prompt change to `(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $`) you will need to run the following command to install a required Python package.

```bash
python3 -m pip install wheel
```

Once you have installed the required Python package it is now time to install Home Assistant Core!

```bash
pip3 install homeassistant
```

Start Home Assistant Core for the first time. This will complete the installation for you, automatically creating the `.homeassistant` configuration directory in the `/home/homeassistant` directory, and installing any basic dependencies.

```bash
hass
```

You can now reach your installation on your Raspberry Pi over the web interface on `http://ipaddress:8123`.

<div class='note'>

When you run the `hass` command for the first time, it will download, install and cache the necessary libraries/dependencies. This procedure may take anywhere between 5 to 10 minutes. During that time, you may get "site cannot be reached" error when accessing the web interface. This will only happen for the first time, and subsequent restarts will be much faster.

</div>

## Updating

To update to the latest version of Home Assistant Core follow these simple steps:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install --upgrade homeassistant
```

Once the last command executes, restart the Home Assistant Core service to apply the latest updates. Please keep in mind that some updates may take longer to start up than others. If Home Assistant Core fails to start, make sure you check the **Breaking Changes** from the [Release Notes](https://www.home-assistant.io/latest-release-notes/).

## Run a specific version

In the event that a Home Assistant Core version doesn't play well with your hardware setup, you can downgrade to a previous release. For example:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install homeassistant==0.XX.X
```

## Run the beta version

If you would like to test next release before anyone else, you can install the beta version released every two weeks, for example:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install --pre --upgrade homeassistant
```

## Run the development version

If you want to stay on the bleeding-edge Home Assistant Core development branch, you can upgrade to `dev`.

<div class='note warning'>
  The "dev" branch is likely to be unstable. Potential consequences include loss of data and instance corruption.
</div>

For example:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install --upgrade git+git://github.com/home-assistant/home-assistant.git@dev
```

## Activating the virtual environment

When instructions tell you to activate the virtual environment, the following commands will do this:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```
