---
layout: page
title: "GPSLogger"
description: "Instructions on how to use GPSLogger to track devices in Home Assistant."
date: 2016-11-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
ha_release: 0.34
---

The `gpslogger` device tracker platform allows you to detect presence using [GPSLogger](http://code.mendhak.com/gpslogger/).

<p class='note'>
You must have the [Geofency component](/components/geofency/) configured to use this device tracker.
</p>

A request can be forced from the app to test if everything is working fine. A successful request will update the `known_devices.yaml` file with the device's serial number.
