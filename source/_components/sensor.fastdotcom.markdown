---
layout: page
title: "Fast.com Sensor"
description: "How to integrate Fast.com Sensor within Home Assistant."
date: 2016-08-10 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: fastdotcom.png
ha_category: System Monitor
featured: false
ha_release: 0.26
ha_iot_class: "Cloud Polling"
---

The `fastdotcom` sensor uses the [Fast.com](https://fast.com/) web service to measure network bandwidth performance.

<p class='note'>
You must have the [Fast.com component](/components/fastdotcom/) configured to use this sensor.
</p>

<p class='note'>
Currently fast.com only supports measuring download bandwidth. If you want to measure bandwidth metrics other then download such as ping and upload, utilize the [speedtest](/components/sensor.speedtest) component.
</p>

## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- This entity will return the maximum measured speed during an 15 second test.
