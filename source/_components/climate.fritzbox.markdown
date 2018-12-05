---
layout: page
title: "Fritzbox Thermostat"
description: "Instructions on how to integrate the AVM Fritzbox thermostat."
date: 2017-11-12 17:10
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Climate
ha_release: 0.68
ha_iot_class: "Local Polling"
---

<p class='note'>
To get AVM fritzbox thermostat follow the instructions for the general [Fritzbox](/components/fritzbox/).
</p>

### {% linkable_title Attributes %}

The are several attributes that can be useful for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `device_locked` | The state of the key lock at the device.
| `locked` | The state of the lock for configuring the device via the app or the Fritzbox web interface.
| `low_battery` | The low battery state indication.
| `battery_level` | The battery level (only available since Fritz!OS 7).
| `holiday_mode` | The state of the holiday mode (only available since Fritz!OS 7).
| `summer_mode` | The state of the summer mode (only available since Fritz!OS 7).
| `window_open` | The state of the window open detection (only available since Fritz!OS 7).
