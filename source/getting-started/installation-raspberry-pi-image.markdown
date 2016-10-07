---
layout: page
title: "Hassbian image for Raspberry Pi"
description: "Instructions to flash the Home Assistant Hassbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

The easiest way to install Home Assistant on your Raspberry Pi is by using Hassbian: a Raspberry Pi image with Home Assistant built-in. The image will install the latest version of Home Assistant on initial boot (~5 minutes).

 1. [Download the latest image][image-download]
 2. Flash the image to an SD card:
   - [Windows][flash-windows]
   - [Linux][flash-linux]
   - [Mac][flash-macos]
 3. Ensure your Raspberry Pi has access to the internet.
 4. Insert SD card to Raspberry Pi and turn it on. Initial installation of Home Assistant will take 5 minutes.

These instructions are also available as a [video](https://www.youtube.com/watch?v=iIz6XqDwHEk).

Home Assistant will now be available by navigating with a browser to `http://ip-address-of-pi:8123`. The default username is `pi` and password is `raspberry` (please change this by running `passwd`). The Home Assistant configuration is located at `/home/homeassistant/.homeassistant/`.

The following extras are included on the image:

 - GPIO pins are ready to use.
 - Mosquitto MQTT broker is installed (not activated by default).
 - Bluetooth is ready to use (supported models only, no Bluetooth LE).

Some extra tips:

 - Check out the list of [Raspberry Pi hardware specific components][pi-components].
 - Z-Wave support can be installed by following the [Getting started instructions for Z-Wave](/getting-started/z-wave/).
 - Change the hostname of your Pi
   - run `sudo raspi-config`
   - `9 Advanced Options` then `A2 Hostname`.
   

### {% linkable_title Technical Details %}

 - Home Assistant is installed in a virtual Python environment at `/srv/homeassistant`
 - Home Assistant will be started as a service run by the user `homeassistant`

{% comment %}

  TODO:

  Add instructions:

   - How to login via shell (?) or at least mention how to work with a Pi
   - How to restart HASS
   - How to see the logs for config validation
   - How to update the config

{% endcomment %}

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
