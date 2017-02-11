---
layout: page
title: "Installing Hassbian"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-raspberry-pi-image/
---

The easiest way to install Home Assistant on your Raspberry Pi is by using HASSbian: a Raspberry Pi image with Home Assistant built-in. The image will install the latest version of Home Assistant on initial boot (~10 minutes).

 1. [Download the Hassbian 1.1 image][image-download] (359MB)
 2. Use [Etcher][etcher] to flash the image to your SD card
 3. Ensure your Raspberry Pi has access to the internet.
 4. Insert SD card to Raspberry Pi and turn it on. Initial installation of Home Assistant will take about 5 minutes.

These instructions are also available as a [video](https://www.youtube.com/watch?v=iIz6XqDwHEk).

After initial boot, you can reach Home Assistant in your browser at [http://hassbian.local:8123]. If you want to login via SSH, the default username is `pi` and password is `raspberry` (please change this by running `passwd`). The Home Assistant configuration is located at `/home/homeassistant/.homeassistant/`.

The following extras are included on the image:

 - GPIO pins are ready to use.
 - Bluetooth is ready to use (supported models only, no Bluetooth LE).

### {% linkable_title Technical Details %}

 - Home Assistant is installed in a virtual Python environment at `/srv/homeassistant/`
 - Home Assistant will be started as a service run by the user `homeassistant`
 - The configuration is located at `/home/homeassistant/.homeassistant`


### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Learn how to configure Home Assistant &raquo;](/getting-started/configuration/)
### [Learn common tasks in Hassbian &raquo;](/getting-started/hassbian-common-tasks/)

[image-download]: https://github.com/home-assistant/pi-gen/releases/download/v1.1/image_2017-02-03-HASSbian.zip
[etcher]: https://etcher.io/
[http://hassbian.local:8123]: http://hassbian.local:8123
