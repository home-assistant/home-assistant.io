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

The goal of this getting started guide is to install [Hass.io](/hassio/) on a Raspberry Pi 3. Hass.io is our own all in one solution that turns your Raspberry Pi into the ultimate home automation hub.

Follow this guide if you want to easily get started with Home Assistant, or if you have no or little Linux experience. For advanced users or if you have no Raspberry Pi at hand, check our [alternative installation methods](/docs/installation/). The [FAQ](/faq/#home-assistant-vs-hassio) explains more about the differences.

### {% linkable_title Hardware requirements %}

We will need a few things to get started with installing Home Assistant. Links below are linking to Amazon US. If you're not in the US, you should be able to find these items in web stores in your country.

- [Raspberry Pi 3 model B](http://a.co/gEfMqL4) + [Power Supply](https://www.raspberrypi.org/help/faqs/#powerReqs) (at least 2.5A)
- [Micro SD Card](http://a.co/gslOydD). Get one that is Class 10 as they are more reliable. Size 32GB or bigger recommended.
- SD Card reader. Part of most laptops, and also available as [standalone USB sticks](http://a.co/5FCyb0N) (the brand doesn't matter, just pick the cheapest)
- Ethernet cable (optional, Hass.io can work with WiFi too)

### {% linkable_title Software requirements %}

- Download [Hass.io image for Raspberry Pi 3][pi3]
- Download [Etcher] to write the image to an SD card
- Text Editor like [Visual Studio Code](https://code.visualstudio.com/)

[Etcher]: https://etcher.io/
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/1.3/resinos-hassio-1.3-raspberrypi3.img.bz2

### {% linkable_title Installing Hass.io %}

1. Put the SD card in your SD card reader.
1. Open Etcher, select the Hass.io image and flash it to the SD card.
1. WiFi setup only: open the file `system-connections/resin-sample` (from the `resin-boot` volume on the SD card) with a text editor. Change `ssid` to be your network name and `psk` to be your password. Note that the Raspberry Pi 3 is a 2.4GHz WiFi device, so do not try to connect it to a 5GHz network.
1. Unmount the SD card and remove it from your SD card reader.
1. Insert the SD card into your Raspberry Pi 3. If you are going to use an Ethernet cable, connect that too.
1. Connect your Raspberry Pi to the power supply so it turns on.
1. The Raspberry Pi will now boot up, connect to the Internet and download the latest version of Home Assistant. This will take about 20 minutes. Do not expect anything but the Home Assistant logo on the HDMI display, or any use for a keyboard or mouse.
1. Home Assistant will be available at [http://hassio.local:8123][local]. Shortly after the download has started, a simple preparation status page will be available at this URL. Point your browser there. The page refreshes automatically, and Home Assistant will be shown when the download is complete.

[local]: http://hassio.local:8123

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
