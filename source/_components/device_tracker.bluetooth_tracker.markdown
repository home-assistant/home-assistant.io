---
layout: page
title: "Bluetooth Tracker"
description: "Instructions how to integrate bluetooth tracking within Home Assistant."
date: 2016-04-10 17:24
sidebar: true
comments: false
sharing: true
footer: true
logo: bluetooth.png
ha_category: Presence Detection
ha_iot_class: "Local Poll"
---

This tracker discovers new devices on boot and tracks bluetooth devices periodically based on interval_seconds value. Devices discovered are stored with 'bt_' as the prefix for device mac in `known_devices.yaml`.

Requires PyBluez

```yaml
device_tracker:
  platform: bluetooth_tracker
  track_new_devices: true
  interval_seconds: 60
  consider_home: 180
```
