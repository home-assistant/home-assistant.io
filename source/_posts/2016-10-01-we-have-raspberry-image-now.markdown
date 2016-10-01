---
layout: post
title: "We have a Raspberry Pi image now"
description: "Release of the Rapsberry Pi Image for Home Assistant"
date: 2016-10-01 01:00:00 -0400
date_formatted: "October 1, 2016"
author: Fredrik Lindqvist
comments: true
categories: Technology
---

We finally have a Raspberry Pi image! It's been named Hassbian in honor of Raspbian.
The image can be found [here](https://github.com/home-assistant/pi-gen/releases).  
This image comes pre-installed with the dependencies, permissions and so on for Home Assistant.  
Image is based on the same install instructions as the [Manual installation](/getting-started/installation-raspberry-pi/).  
It's based on Raspbian Lite and generated with a fork of the same [script](https://github.com/home-assistant/pi-gen) that builds the [official Raspbian images](https://raspberrypi.org/downloads/raspbian/). Please note that this project has no association with the Raspberry Pi foundation or their projects.  

On first boot the latest release of Home Assistant will be [installed](/getting-started/installation-raspberry-pi-image/) and can be reached after 3~5 minutes.
Pre-installed on this image is the MQTT broker [Mosquitto](https://mosquitto.org/), Bluetooth support and settings for the `homeassistant` account to use the GPIO pins of the Raspberry Pi. Mosquitto is not activated by default.

As it is today there is no pre-compiled Z-Wave support but it can be installed by following the [Getting started instructions for Z-Wave](/getting-started/z-wave/).

A short [video](https://youtu.be/iIz6XqDwHEk) about the release has been made by [@bruhautomation](https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w) that covers this and a bit more.

Happy Automating!
