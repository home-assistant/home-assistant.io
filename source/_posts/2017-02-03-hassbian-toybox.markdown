---
title: "HASSbian 1.1 - The Toy-box"
description: "New release of the HASSbian Raspberry Pi Image for Home Assistant"
date: 2017-02-04 05:00:00 -0400
date_formatted: "February 4, 2017"
author: Fredrik Lindqvist
categories: Technology
---

Tonight I'm happy to announce a new release of the our Raspberry Pi image, **HASSbian 1.1 - The Toy-box.**  
Why Toy-box you wonder? Because it encompass the changes pretty well.

Changes from previous image are big and small but lets start with the interesting things.

### Hassbian-scripts
A set of script written to add extra functionality to your Raspberry Pi installation. 
This scripts are run as the `pi` user and installs a set of tools or packages.
Currently includes:
 - Install Libcec. Adds local [HDMI-CEC support][cec].
 - Install Mossquitto. Installs the latest Mosquitto package and client tools from the Mosquitto projects official repository. Now includes websocket support.
 - Install OpenZWave. Installs OpenZWave and prepares for using a USB or GPIO ZWave controller.
 - Install Samba. Installs the Samba packages and shares your configuration over smb to be available to edit on any computer without the need for separate file transfer software. This share is unsecured and its usage is not recommended if your installation is publicly available.

All of these scripts are available in the directory `/home/pi/hassbian-scripts/`. This directory is actually a cloned git repository that's cloned on first boot and can be updated to the latest release with ease after.
To update the hassbian-scripts directory execute the following command as the `pi` user.
```bash
cd hassbian-scripts
git pull
```
To use any of the hassbian-scripts, execute the following command as the `pi` user. Here we use the libcec script as an example.
```bash
sudo ./hassbian-scripts/install_libcec.sh
```

For more information about these scripts have a look a the [hassbian-scripts repository][hassbian-repo]. 

### Spring cleaning
With this image there also quite a bit of cleaning of the base system and the script that generates our Raspberry Pi image.
 - Update pi-gen. Our build script has been upgraded to follow the Raspbian image closer. This image is basically a Raspbian lite image with Home Assistant, dependencies and a small set of changes to the base system.
 - Removed Mosquitto. Not as bad as it sounds since it's installation has been move to one of our new hassbian-scripts.
 - Added rng-tools. Let's your HASSbian installation use the hardware support in the Raspberry Pi for entropy generation.
 - Added avahi-daemon package. Your Raspberry Pi should now be available at [hassbian.local][hassbian-avahi]. 
 - Added htop. User friendly interactive process monitor.
 - Added tmux. A great terminal multiplexer that makes working with the command line over ssh easier.
 - Added the `homeassistant` user to the `dialout` group. Simplifies use of hardware such as ZWave USB controllers that requires this permission.
 
### On the horizon
There's of course more on the horizon and there's even more plans and wishes for how this image will function in the future.
On the close horizon from [@Landrash][landrash-github] there a few more script in the works and for tellstick, emulated_hue and for controlling Home Assistant.

To follow discussions about the development of the HASSbian image or to contribute join our [Discord chat server][discord].
 
To get started with the new image, check out the installation instructions in the getting started section.
 
[cec]: /integrations/hdmi_cec/
[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[hassbian-avahi]: https://hassbian.local
[landrash-github]: https://github.com/Landrash
[discord]: https://discord.gg/8X8DTH4
