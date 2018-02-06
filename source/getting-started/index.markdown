---
layout: page
title: "Install Home Assistant"
description: "Getting started: How to install Home Assistant."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant is a Python program and can be installed and run as any other Python program.  However, configuring a whole system can be intimidating for the novice, so there are a number of ways to do most of the hard work of installing and configuring the Home Assistant.

## {% linkable_title Which Installation Method Should I Choose? %}

If you have a Raspberry Pi but not much Linux knowledge or just want a system up and running to see what it is like, install using HASS.IO method below.  This is the easiest way of installing Home Assistant.

If you have a new Raspberry Pi, but want to be able to run other programs on it alongside Home Assistant, you should try the [Hassbian Image](/docs/hassbian/installation/)

If you have an existing computer (including a Raspberry Pi) and are familiar with Docker, you can install using the [Docker images](docs/installation/docker/).

If you have a MAC, try the [Mac Installation](/docs/installation/macos/)

If you have an existing computer with Python 3.5 already installed, you can install using the [pip packages](/docs/installation/virtualenv/).

Otherwise check all our [alternative installation methods](/docs/installation/).

## {% linkable_title HASS.IO %}
HASS.IO is the easiest way of installing Home Assistant.  It is our own all in one solution that turns your Raspberry PI into the ultimate home automation hub, but can also be run on other operating systems.

The goal of this getting started guide is to install Hass.io on a Raspberry Pi 3. 

### {% linkable_title Hardware requirements %}

We will need a few things to get started with installing Home Assistant. Links below are linking to Amazon US. If you're not in the US, you should be able to find these items in web stores in your country.

- [Raspberry Pi 3 model B](http://a.co/gEfMqL4) + [Power Supply](http://a.co/cgKUgkt) (at least 2.5A)
- [Micro SD Card](http://a.co/gslOydD). Get one that is Class 10 as they are more reliable. Size 32GB or bigger recommended.
- SD Card reader. Part of most laptops, and also available as [standalone USB sticks](http://a.co/5FCyb0N) (the brand doesn't matter, just pick the cheapest)
- Ethernet cable (optional, Hass.io can work with WiFi too)

### {% linkable_title Software requirements %}

- Download [Hass.io image for Raspberry Pi 3][pi3]
- Download [Etcher] to write the image to an SD card
- Text Editor like [Visual Studio Code](https://code.visualstudio.com/)

[Etcher]: https://etcher.io/
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/1.1/resinos-hassio-1.1-raspberrypi3.img.bz2

### Installing Hass.io

1. Put the SD card in your SD card reader.
1. Open Etcher, select the Hass.io image and flash it to the SD card.
1. WiFi setup only: open the file `system-connections/resin-sample` with a text editor. Change `ssid` to be your network name and `psk` to be your password.
1. Unmount the SD card and remove it from your SD card reader.
1. Insert the SD card into your Raspberry Pi 3. If you are going to use an Ethernet cable, connect that too.
1. Connect your Raspberry Pi to the power supply so it turns on.
1. The Raspberry Pi will now boot up, connect to the Internet and download the latest version of Home Assistant. This will take about 20 minutes.
1. Home Assistant will be available at [http://hassio.local:8123][local].

[local]: http://hassio.local:8123

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
