---
layout: page
title: "Fritzbox temperature sensor"
description: "Instructions on how to integrate the AVM Fritzbox temperature sensor."
date: 2019-01-22 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Sensor
ha_release: 0.87
ha_iot_class: "Local Polling"
---

To get AVM Fritzbox temperature sensor (e.g. FRITZ!DECT Repeater 100) follow the instructions for the [Fritzbox component](/components/fritzbox/).

## {% linkable_title Attributes %}

The are several attributes that can be useful for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `device_locked` | The state of the key lock at the device.
| `locked` | The state of the lock for configuring the device via the app or the Fritzbox web interface.
| `temperature_unit` |  The unit of the temperature sensor.
| `temperature` | The current temperature sensor reading.
