---
layout: page
title: "deCONZ Binary Sensor"
description: "Instructions on how to integrate Zigbee binary sensors from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Binary Sensor
ha_release: "0.61"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

The following sensor types are supported:

 * Fire/Smoke detection
 * Open/Close detection
 * Presence detection

Entity ids will be binary_sensor.device_name, where device_name is defined in deCONZ.

#### {% linkable_title Verified to be supported binary sensors %}

- Open/Close Detection
  - Xiaomi Smart Home Security Door & Window Contact Sensor
- Presence Detection
  - IKEA Trådfri Motion Sensor
  - Philips Hue Motion Sensor
  - Xiaomi Motion Sensor
  - Xiaomi Smart Home Aqara Human Body Sensor
