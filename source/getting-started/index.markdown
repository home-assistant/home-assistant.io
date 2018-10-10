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

The goal of this getting started guide is to install [Hass.io](/hassio/) on a Raspberry Pi. Hass.io is our own all in one solution that turns your Raspberry Pi or another device into the ultimate home automation hub.

Follow this guide if you want to get started with Home Assistant easily, or if you have no or little Linux experience. For advanced users or if you have no Raspberry Pi at hand, check our [alternative installation methods](/docs/installation/). The [FAQ](/faq/#home-assistant-vs-hassio) explains more about the differences.

<p class='note warning'>
  Please remember to [secure your installation](/docs/configuration/securing/) once you've finished with the installation process.
</p>

### {% linkable_title Suggested hardware%}

We will need a few things to get started with installing Home Assistant. For best performance, we suggest the latest Raspberry Pi 3 Model B+. Links below are linking to Amazon US. If you're not in the US, you should be able to find these items in web stores in your country.

- [Raspberry Pi 3 Model B+](http://a.co/ak2SQor) + [Power Supply](https://www.raspberrypi.org/help/faqs/#powerReqs) (at least 2.5A)
- [Micro SD Card](http://a.co/gslOydD). Get one that is Class 10 as they are more reliable. Size 32 GB or bigger recommended.
- SD Card reader. Part of most laptops, and also available as [standalone USB sticks](http://a.co/5FCyb0N) (the brand doesn't matter, just pick the cheapest)
- Ethernet cable (optional, Hass.io can work with WiFi as well)
- A USB-Stick (optional, allows for unattended configuration)

### {% linkable_title Software requirements %}

- Download the Hass.io image for [your device](https://www.home-assistant.io/hassio/installation/)
- Download [Etcher] to write the image to an SD card
- Text Editor like [Visual Studio Code](https://code.visualstudio.com/)

[Etcher]: https://etcher.io/

### {% linkable_title Installing Hass.io %}

1. Put the SD card in your SD card reader.
1. Open Etcher, select the Hass.io image and flash it to the SD card.
1. WiFi setup only: Format a USB-Stick with name `CONFIG` and copy one of [the examples] to the file `network/hassos-wifi`.
1. Unmount the SD card and remove it from your SD card reader.
1. Insert the SD card into your Raspberry Pi 3. If you are going to use an Ethernet cable, connect that too.
1. Connect your Raspberry Pi to the power supply, so it turns on.
1. The Raspberry Pi will now boot up, connect to the Internet and download the latest version of Home Assistant, which will take about 20 minutes.
1. Home Assistant will be available at [http://hassio.local:8123][local]. Shortly after the download has started, a simple preparation status page will be available at this URL. Point your browser there. The page refreshes automatically, and Home Assistant will be shown when the download is complete.

[local]: http://hassio.local:8123
[the examples]: https://github.com/home-assistant/hassos/blob/dev/Documentation/network.md

<p class='note'>
When you're done, remember to set up regular backups of your configuration. These backups will protect you from hardware failure and mistakes. On Hass.io you have snapshots, but you can back up to [GitHub](/docs/ecosystem/backup/backup_github/), [DropBox](/docs/ecosystem/backup/backup_dropbox/) and many other ways. All that matters is that you set them up and test them regularly.
</p>

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
