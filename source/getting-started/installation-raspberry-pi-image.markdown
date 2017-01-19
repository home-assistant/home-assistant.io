---
layout: page
title: "HASSbian image for Raspberry Pi"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

The easiest way to install Home Assistant on your Raspberry Pi is by using HASSbian: a Raspberry Pi image with Home Assistant built-in. The image will install the latest version of Home Assistant on initial boot (~5 minutes).

 1. [Download the latest image][image-download]
 2. Flash the image to an SD card:
   - [Windows][flash-windows]
   - [Linux][flash-linux]
   - [Mac OS][flash-macos]
 3. Ensure your Raspberry Pi has access to the internet.
 4. Insert SD card to Raspberry Pi and turn it on. Initial installation of Home Assistant will take about 5 minutes.

These instructions are also available as a [video](https://www.youtube.com/watch?v=iIz6XqDwHEk).

Home Assistant will now be available by navigating with a browser to `http://ip-address-of-pi:8123`. The default username is `pi` and password is `raspberry` (please change this by running `passwd`). The Home Assistant configuration is located at `/home/homeassistant/.homeassistant/`.

The following extras are included on the image:

 - GPIO pins are ready to use.
 - Mosquitto MQTT broker is installed (not activated by default).
 - Bluetooth is ready to use (supported models only, no Bluetooth LE).

Some extra tips:

 - Check out the list of [Raspberry Pi hardware specific components][pi-components].
 - Z-Wave support can be installed by following the [Getting started instructions for Z-Wave][install-zwave].
 - Run `sudo raspi-config` to change the locale, timezone and keyboard layout.

### {% linkable_title Technical Details %}

 - Home Assistant is installed in a virtual Python environment at `/srv/homeassistant/`
 - Home Assistant will be started as a service run by the user `homeassistant`
 - The configuration is located at `/home/homeassistant/.homeassistant`

### {% linkable_title Managing your HASSbian installation %}
#### {% linkable_title Login to HASSbian on the Raspberry Pi %}
To login to your Raspberry Pi running HASSbian your going to be using a ssh client. Depending on your platform there are several alternatives for doing this. Linux and Max OS generally have a ssh client installed. Windows users are recommended to download and install the ssh client [Putty][ssh-putty].

Connect to the Raspberry Pi over ssh. Default user name is `pi` and password is `raspberry`.  
Linux and Mac OS users execute the following command in a terminal.

```bash
$ ssh pi@ip-address-of-pi
```

Windows users start [Putty][ssh-putty], enter the IP address of the Raspberry Pi in the *Host name* field and port 22 in the *Port* field. Then click *Open* and a terminal window will open. Enter the credentials. Default user name is `pi` and password is `raspberry`.

Optionally, starting with Windows 10 anniversary update, you can use the built-in '[Bash on Windows][bash-windows]' to use SSH if you have enabled Developer mode and have installed the "Windows Subsystem for Linux (beta)" feature.

#### {% linkable_title Start/Stop/Restart Home Assistant on HaSSbian %}
Log in as the `pi` account account and execute the following commands:

```bash
$ sudo systemctl stop home-assistant@homeassistant.service 
```

Replace `stop` with `start` or `restart` to get the desired functionality.
To get the current state of the `homeassistant.service` replace `stop` with `status`. 

#### {% linkable_title Update Home Assistant on HASSbian %}

Log in as the `pi` account and execute the following commands:

```bash
$ sudo systemctl stop home-assistant@homeassistant.service 
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
$ pip3 install --upgrade homeassistant
$ exit
$ sudo systemctl start home-assistant@homeassistant.service
```

This will in order do the following:

- Stop the Home Assistant service running on HASSbian
- Open a shell as the `homeassistant` user running the Homeassistant service and that has ownership over the Home Assistant installation.
- Change into the virtual Python environment at `/srv/homeassistant/` containing the Home Assistant installation.
- Upgrade the Home Assistant installation to the latest release.
- Exit the shell and return to the `pi` user.
- Restart the Home Assistant service.

#### {% linkable_title Manually launch Home Assistant on HASSbian %}
Log in as the `pi` account and execute the following commands:

```bash
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
$ hass
```

This will start Home Assistant in your shell and output anything that ends up in the log and more into the console. This will fail if the Home Assistant service is already running so don't forget to [stop][stop-homeassistant] it first.

#### {% linkable_title Check your configuration on HASSbian %}
Log in as the `pi` account and execute the following commands:

```bash
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
$ hass --script check_config
```

This will output any errors in your configuration files to console.

#### {% linkable_title Read the Home Assistant log file on HASSbian %}
Log in as the `pi` account and execute the following commands:

```bash
$ sudo su -s /bin/bash homeassistant
$ cd /home/homeassistant/.homeassistant
$ nano homeassistant.log
```

This will in order do the following:

- Open a shell as the `homeassistant` user.
- Change directory to the Home Assistant configuration directory.
- Open the log file in the nano editor.

Optionaly, you can also view the log with `journalctl`.
Log in as the `pi` account and execute the following commands:

```bash
$ sudo journalctl -fu home-assistant@homeassistant.service
```

#### {% linkable_title Edit the Home Assistant configuration on HASSbian %}
Log in as the `pi` account and execute the following commands:

```bash
$ sudo su -s /bin/bash homeassistant
$ cd /home/homeassistant/.homeassistant
$ nano configuration.yaml
```

This will in order do the following:

- Open a shell as the `homeassistant` user.
- Change directory to the Home Assistant configuration directory.
- Open the configuration file in the nano editor.

It's generally recommended that you read the [Getting started][configuring-homeassistant] guide for how to configure Home Assistant.

#### {% linkable_title Upgrade and update HASSbian %}
HASSbian is based on Raspbian and uses the same repositories. Any changes to Raspbian will be reflected in HASSbian. To update and upgrade system packages and installed software (excluding Home Assistant) do the following.
Log in as the `pi` account and execute the following commands:

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

Press `Y` to confirm that you would like to continue.

### {% linkable_title USB device permissions %}
When using some USB devices users have to give dialout permission to the user `homeassistant` and restart.

```shell
$ sudo usermod -a -G dialout homeassistant
$ sudo reboot
```

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)

[image-download]: https://github.com/home-assistant/pi-gen/releases
[flash-linux]: https://www.raspberrypi.org/documentation/installation/installing-images/linux.md
[flash-macos]: https://www.raspberrypi.org/documentation/installation/installing-images/mac.md
[flash-windows]: https://www.raspberrypi.org/documentation/installation/installing-images/windows.md
[pi-components]: /getting-started/installation-raspberry-pi/#raspberry-pi-hardware-specific-components
[ssh-putty]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[stop-homeassistant]: /getting-started/installation-raspberry-pi-image/#startstoprestart-home-assistant-on-hassbian
[configuring-homeassistant]: /getting-started/configuration/
[bash-windows]: https://msdn.microsoft.com/en-us/commandline/wsl/about
[install-zwave]: /getting-started/z-wave/
