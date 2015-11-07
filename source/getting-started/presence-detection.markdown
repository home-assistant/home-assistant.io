---
layout: page
title: "Setting up presence detection"
description: "Instructions how to setup presence detection within Home Assistant."
date: 2015-10-4 12:08
sidebar: false
comments: false
sharing: true
footer: true
---

<p class='note'>
We care about privacy. Collected data is <b>only</b> stored in your instance of Home Assistant.
</p>

Presence detection detects if people are home, an important input for automation. The most important piece of information is to know if anyone is home. But knowing who is home or where they are will open a whole range of other automation options:

 - Send me a notification when the kid arrives at school
 - Turn on AC when I leave work

<p class='img'>
<img src='/images/screenshots/map.png' />
Screenshot of Home Assistant showing a school, work and home zone and two people.
</p>

## {% linkable_title Setting it up %}

The device tracker component offers presence detection for Home Assistant. It supports two different methods for presence detection: scan for connected devices on the local network and connect to third party service.

Scanning for connected devices is easy to setup. See the instructions for our [supported routers][routers] or [scan the network using nmap][nmap]. This approach does have its limitations. It will only be able to detect if a device is home. It also struggles with iPhones because they disconnect from the WiFi if idle, marking them as not home while they are not.

Home Assistant currently supports one third party service for presence detection: [OwnTracks][ha-owntracks]. OwnTracks is an app that you install on your iPhone or Android phone that allows you to push the location of your device to Home Assistant using an MQTT broker. An MQTT broker is an Internet of Things communication platform that you can [freely host yourself][mqtt-self] or get [a private instance for free in the cloud](/components/mqtt/#run-your-own).

<p class='note'>
OwnTracks communicates directly with your MQTT broker, no data will pass through their servers.
</p>

#### {% linkable_title Zones %}

<img src='/images/screenshots/badges-zone.png' style='float: right; margin-left: 8px; height: 100px;'>

Home Assistant will know about the location for your device if you are using OwnTracks. By [setting up zones][zone] you will be able to add names to locations of your devices. This way you can easily spot on the state page where the people in your house are and use it as [triggers][trigger] and [conditions][condition] for automation.

### [Next step: Setting up automation &raquo;](/getting-started/automation/)

[routers]: /components/#presence-detection
[nmap]: /components/device_tracker.nmap_scanner/
[ha-owntracks]: /components/device_tracker.owntracks/
[mqtt-self]: /components/mqtt/#run-your-own
[mqtt-cloud]: /components/mqtt/#cloudmqtt
[zone]: /components/zone/
[trigger]: /components/automation/#zone-trigger
[condition]: /components/automation/#zone-condition

