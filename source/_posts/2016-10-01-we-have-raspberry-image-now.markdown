---
title: "We have a Raspberry Pi image now"
description: "Release of the Raspberry Pi Image for Home Assistant"
date: 2016-10-01 01:00:00 -0400
date_formatted: "October 1, 2016"
author: Fredrik Lindqvist
categories: Technology
og_image: /images/blog/2016-10-hassbian/social.png
---

Today we're happy to announce our brand new Raspberry Pi image! It is based on Raspbian Lite combined with HASS so we decided to call it Hassbian.

This image comes pre-installed with everything you need to get started with Home Assistant right away.

To get started, check out the installation instructions in the getting started section or watch the latest video by [BRUHAutomation]:

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iIz6XqDwHEk" frameborder="0" allowfullscreen></iframe>
</div>

### Under the hood

It's based on Raspbian Lite and generated with a fork of the same [script](https://github.com/home-assistant/pi-gen) that builds the [official Raspbian images](https://raspberrypi.org/downloads/raspbian/). For installation of HASS it follows the same install instructions as the [Manual installation](/getting-started/installation-raspberry-pi/). Please note that this project has no association with the Raspberry Pi foundation or their projects.

On first boot the latest release of Home Assistant will be installed and can be reached after 3~5 minutes. Pre-installed on this image is the MQTT broker [Mosquitto](https://mosquitto.org/), Bluetooth support and settings for the `homeassistant` account to use the GPIO pins of the Raspberry Pi. Mosquitto is not activated by default.

As it is today there is no pre-compiled Z-Wave support but it can be installed by following the [Getting started instructions for Z-Wave](/getting-started/z-wave/).

Happy Automating!

[BRUHAutomation]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w
