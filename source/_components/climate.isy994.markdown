---
layout: page
title: "ISY994 Climate"
description: "Instructions on how to setup a Z-Wave or INSTEON Thermostat through the ISY994 Controller in Home Assistant."
date: 2019-02-11 05:00
sidebar: true
comments: false
sharing: true
footer: true
logo: universal_devices.png
ha_category: Climate
ha_release: 0.88
ha_iot_class: "Local Polling"
---


The `isy994` climate platform integrates Z-Wave or INSTEON Thermostats from the ISY into Home Assistant, enabling control of setting the following parameters:

- **mode** (cool, heat, fan only, auto, or program auto)
- **target temperature high**
- **target temperature low**
- **fan mode** (on/auto; on supported models)

Current temperature, set points, and unit status is displayed.

### {% linkable_title Insteon Thermostats %}

Insteon thermostats have two sub-nodes that display if the device is currently heating or cooling.  These are exposed separately as [binary_sensors](#binary-sensor).

For configuration instructions, see [the ISY994 component](/components/isy994/).
