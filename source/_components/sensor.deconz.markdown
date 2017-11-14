---
layout: page
title: deCONZ Sensor
description: "Instructions how to integrate Zigbee binary sensors from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Sensor
ha_release: "0.58"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

The following sensor types are supported:

 * Humidity sensor
 * Light level sensor
 * Pressure sensor
 * Switches
 * Temperature sensor

Entity ids will be sensor.device_name, where device_name comes from deCONZ.

#### {% linkable_title Verified to be supported sensors %}

- Humidity sensor
- Light level sensor
- Pressure sensor
- Switches
  - IKEA Trådfri wireless dimmer
- Temperature sensor
