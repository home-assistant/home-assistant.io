---
layout: page
title: "Wink Binary Sensor"
description: "Instructions how to setup the Wink binary sensors within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Binary Sensor
ha_release: 0.14
ha_iot_class: "Cloud Polling"
requirement: hardware
---


The Wink binary sensor platform allows you to get data from your [Wink](http://www.wink.com/) binary sensors.

The requirement is that you have setup [Wink](/components/wink/).


### {% linkable_title Supported Binary sensor devices %}

- Smoke and CO detectors (No Wink hub required for Nest)
- Window/Door sensors
- Motion sensors
- Ring Door bells (No hub required)
- Liquid presence sensors
- Z-wave lock key codes
- Lutron connected bulb remote buttons
- Wink Relay buttons and presence detection
- Wink spotter loudness and vibration (No Wink hub required)
- Wink hub devices connection status. This includes any paired hubs like Hue, Wink v1, Wink v2, Wink Relay...
- Dropcam sensors

<p class='note'>
The above devices are confirmed to work, but others may work as well.
</p>

