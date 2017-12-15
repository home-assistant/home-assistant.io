---
layout: page
title: deCONZ Sensor
description: "Instructions how to integrate Zigbee sensors from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Sensor
ha_release: "0.60"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

The following sensor types are supported:

 * Humidity sensor
 * Light level sensor
 * Pressure sensor
 * Switches
 * Temperature sensor

Entity ids will be sensor.device_name, where device_name is defined in deCONZ.

#### {% linkable_title Verified to be supported sensors %}

- Humidity Sensor
  - Xiaomi Aqara Humidity/Temperature Sensor
  - Xiaomi MiJia Smart Temperature & Humidity Sensor
- Light Level Sensor
- Pressure Sensor
- Switches
  - IKEA Trådfri Wireless Dimmer
  - Philips Hue Motion Sensor
  - IKEA Trådfri Remote
  - Philips Hue Dimmer Switch
  - Xiaomi Cube
  - Xiaomi Aqara Smart Light Switch
  - Xiaomi Aqara Smart Wireless Switch
  - Xiaomi Smart Home Wireless Switch
- Temperature Sensor
  - Xiaomi Temperature/Humidity Sensor
