---
layout: page
title: "Geofency Device Tracker"
description: "Instructions for how to use Geofency to track devices in Home Assistant."
date: 2017-08-22 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: geofency.png
ha_category: Presence Detection
ha_release: 0.53
ha_iot_class: "Cloud Push"
---

This platform allows you to detect presence using [Geofency](http://www.geofency.com/).

<p class='note'>
You must have the [Geofency component](/components/geofency/) configured to use this device tracker.
</p>

Geofency will automatically generate the device tracker name used for geofences, and you will find it in `known_devices.yaml` after the first request. For beacons, the device name will be `beacon_<name from Geofency>`, e.g., `device_tracker.beacon_car`.

When you enter a geofence or stationary beacon, your location name in Home Assistant will be set to the name of the geofence or beacon location in Geofency. When you exit a geofence or stationary beacon, your location name in Home Assistant will be set to 'not home'. For mobile beacons, the location name will be 'not_home' whenever the beacon is entered or exited outside of a [zone](/components/zone/), otherwise, it will be set to the name of the zone.

To make Geofency work better with the [proximity](/components/proximity/) component, you should enable the 'Send Current Location' feature in the Webhook configuration screen. This ensures that the _current_ GPS coordinates are included in exit events instead of the coordinates of the (center of) the zone that was exited.
