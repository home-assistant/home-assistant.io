---
layout: page
title: "Fritzbox Switch"
description: "Instructions on how to integrate the AVM Fritzbox switch."
date: 2017-11-12 17:10
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Switch
ha_release: 0.68
ha_iot_class: "Local Polling"
---

<p class='note'>
To get AVM Fritzbox switch follow the instructions for the general [Fritzbox](/components/fritzbox/).
</p>

### {% linkable_title Attributes %}

The are several attributes that can be useful for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `device_locked` | The state of the key lock at the device.
| `locked` | The state of the lock for configuring the device via the app or the Fritzbox web interface.
| `temperature_unit` |  The unit of the temperature sensor (only available if the device support temperature sensor).
| `temperature` | The current temperature sensor reading (only available if the device supports temperature sensor).
| `total_consumption` | The total power consumption since the beginning of operation (only available if the device supports power meter function).
| `total_consumption_unit` | The unit of the total_consumption (only available if the device supports power meter function).
