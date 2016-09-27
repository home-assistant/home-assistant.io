---
layout: page
title: "Hassbian image on a Raspberry Pi"
description: "Instructions to install the Home Assistant Hassbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

### {% linkable_title Hassbian %}

We finally have a Raspberry Pi image! It's been named Hassbian in honor of Raspbian.
This image comes pre-installed with the dependencies, permissions and so on for Home Assistant. Image is based on the same install instructions as the [Manual installation](/getting-started/installation-raspberry-pi/).  
It's based on Raspbian Lite and generated with a fork of the same [script](https://github.com/home-assistant/pi-gen) that builds the [official Raspbian images](raspberrypi.org/downloads/raspbian/). Please note that this project has no association with the Raspberry Pi foundation or their projects.  

On first boot the latest release of Home Assistant will be installed in a [Virtual Environment](getting-started/installation-virtualenv) at `/srv/homeassistant` and started as a service run by the user `homeassistant`. Since this is done automatically it's required that the Raspberry Pi is connected to the internet with a ethernet cable. Installation takes about 5 minutes on first boot and after that you can connect to your Raspberry pi on `ipaddress:8123`.

Pre-installed on this image is the MQTT broker [Mosquitto](https://mosquitto.org/), Bluetooth support for none Bluetooth LE and settings for the `homeassistant` user to use the GPIO pins of the Raspberry Pi. Mosquitto is not activated by default.

As it is today there is no pre-compiled Z-Wave support but it can be installed by following the [Getting started instructions for Z-Wave](/getting-started/z-wave/).

For Raspberry Pi hardware specific components have a look at our [install guide for the Raspberry Pi](/getting-started/installation-raspberry-pi/#raspberry-pi-hardware-specific-components). Default password for the `pi` user is `raspberry` and is highly recommended to be changed. 

### {% linkable_title Installation %}

The image can be found as a [release](https://github.com/home-assistant/pi-gen/releases) in the [pi-gen repository](https://github.com/home-assistant/pi-gen/).

Installation instructions are the same as for Raspbian and it's recommended to follow [these](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
