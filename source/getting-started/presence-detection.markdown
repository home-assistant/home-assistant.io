---
layout: page
title: "Setting up presence detection"
description: "Instructions on how to setup presence detection within Home Assistant."
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

The device tracker component offers presence detection for Home Assistant. It supports three different methods for presence detection: scan for connected devices on the local network, scan for Bluetooth devices within range, and connect to third-party service.

Scanning for connected devices is easy to setup; options include [supported routers][routers] and [scanning the network using Nmap][nmap]. This approach does have its limitations, however: it will only be able to detect if a device is at home, and modern smartphones may show as not home inaccurately (as they disconnect from WiFi if idle).

You can scan for [Bluetooth][ha-bluetooth] and [Bluetooth LE][ha-bluetooth-le] devices. Unlike with WiFi, modern smartphones don't turn off Bluetooth automatically, though the range is lower.

Home Assistant currently supports multiple third-party services for presence detection, such as [OwnTracks over MQTT][ha-owntracks-mqtt], [OwnTracks over HTTP][ha-owntracks-http] [GPSLogger][ha-gpslogger] and [Locative][ha-locative].

There is a wide [range of options][ha-presence] available, both for scanning your local network and third-party services.

### {% linkable_title Zones %}

<img src='/images/screenshots/badges-zone.png' style='float: right; margin-left: 8px; height: 100px;'>

Home Assistant will know the location of your device if you are using a device tracker that reports a GPS location (such as OwnTracks, GPS Logger, the iOS app, and others). By [setting up zones][zone] you will be able to add names to the locations of your devices. This way you can easily spot on the state page where the people in your house are and use it as [triggers][trigger] and [conditions][condition] for automation.

<p class='note'>
If you're looking at the [map view][ha-map] then any devices in your Home zone won't be visible, this is by design.
</p>

[routers]: /components/#presence-detection
[nmap]: /components/device_tracker.nmap_tracker/
[ha-bluetooth]: /components/device_tracker.bluetooth_tracker/
[ha-bluetooth-le]: /components/device_tracker.bluetooth_le_tracker/
[ha-owntracks-mqtt]: /components/device_tracker.owntracks/
[ha-owntracks-http]: /components/device_tracker.owntracks_http/
[ha-locative]: /components/device_tracker.locative/
[ha-gpslogger]: /components/device_tracker.gpslogger/
[ha-presence]: /components/#presence-detection
[mqtt-self]: /components/mqtt/#run-your-own
[mqtt-cloud]: /components/mqtt/#cloudmqtt
[zone]: /components/zone/
[trigger]: /getting-started/automation-trigger/#zone-trigger
[condition]: /getting-started/automation-condition/#zone-condition
[ha-map]: /components/map/

### [Next step: Use Home Assistant &raquo;](/getting-started/use/)
