---
layout: page
title: "deCONZ Binary Sensor"
description: "Instructions how to integrate Zigbee binary sensors from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Binary Sensor
ha_release: "0.59"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

The following sensor types are supported:

 * Open/Close detection
 * Presence detection

Entity ids will be binary_sensor.device_name, where device_name comes from deCONZ.

#### {% linkable_title Verified to be supported binary sensors %}

- Open/Close Detection
- Presence Detection
  - IKEA Trådfri Motion Sensor
  - Philips Hue Motion Sensor
