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
ha_release: 0.66
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
