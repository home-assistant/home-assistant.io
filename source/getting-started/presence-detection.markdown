---
layout: page
title: "Setting up presence detection"
description: "Instructions how to setup presence detection within Home Assistant."
date: 2015-10-04 12:08
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note'>
We care about privacy. Collected data is <b>only</b> stored in your instance of Home Assistant.
</p>

Presence detection detects if people are home, which is the most valuable input for automation. Knowing who is home or where they are, will open a whole range of other automation options:

- Send me a notification when my child arrives at school
- Turn on the AC when I leave work

<p class='img'>
<img src='/images/screenshots/map.png' />
Screenshot of Home Assistant showing a school, work and home zone and two people.
</p>

### {% linkable_title Setting it up %}

The device tracker component offers presence detection for Home Assistant. It supports two different methods for presence detection: scan for connected devices on the local network and connect to third party service.

Scanning for connected devices is easy to setup. See the instructions for our [supported routers][routers] or [scan the network using nmap][nmap]. This approach does have its limitations, however: it will only be able to detect if a device is at home, and iPhones may show as not home inaccurately (as iPhones disconnect from WiFi if idle).

Home Assistant currently supports multiple third-party services for presence detection: [OwnTracks][ha-owntracks], [GPSLogger][ha-gpslogger] and [Locative][ha-locative]. OwnTracks is an app that you install on your iPhone or Android phone that allows you to push the location of your device to Home Assistant using an MQTT broker. An MQTT broker is an Internet of Things communication platform that you can [freely host yourself][mqtt-self] or get [a private instance for free in the cloud](/components/mqtt/#run-your-own).

<p class='note'>
OwnTracks communicates directly with your MQTT broker; no data will pass through their servers.
</p>

### {% linkable_title Zones %}

<img src='/images/screenshots/badges-zone.png' style='float: right; margin-left: 8px; height: 100px;'>

Home Assistant will know the location of your device if you are using OwnTracks. By [setting up zones][zone] you will be able to add names to the locations of your devices. This way you can easily spot on the state page where the people in your house are and use it as [triggers][trigger] and [conditions][condition] for automation.

[routers]: /components/#presence-detection
[nmap]: /components/device_tracker.nmap_tracker/
[ha-owntracks]: /components/device_tracker.owntracks/
[ha-locative]: /components/device_tracker.locative/
[ha-gpslogger]: /components/device_tracker.gpslogger/
[mqtt-self]: /components/mqtt/#run-your-own
[mqtt-cloud]: /components/mqtt/#cloudmqtt
[zone]: /components/zone/
[trigger]: /getting-started/automation-trigger/#zone-trigger
[condition]: /getting-started/automation-condition/#zone-condition

### [Next step: Use Home Assistant &raquo;](/getting-started/use/)
