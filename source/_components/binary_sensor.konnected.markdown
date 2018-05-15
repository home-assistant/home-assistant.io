---
layout: page
title: "Konnected Binary Sensor"
description: "Connect wired open/close sensors to Home Assistant with Konnected and a NodeMCU ESP8266"
date: 2018-04-03 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: konnected.png
ha_category: Binary Sensor
ha_release: "0.70"
ha_iot_class: "Local Push"
---

The `konnected` binary sensor allows you to monitor wired door sensors, window sensors, motion sensors, smoke detectors,
CO detectors, glass-break sensors, water leak sensors or any other simple wired open/close circuit attached to a
NodeMCU ESP8266 WiFi module running the [open source Konnected software](https://github.com/konnected-io/konnected-security).

See the [`konnected`](/components/konnected/) component for configuration and setup instructions. Please visit the 
[Konnected.io website](https://konnected.io) for more information about the Konnected Alarm Panel board and compatible
hardware. 

This component supports all of the built-in device classes of the generic [Binary Sensor](/components/binary_sensor/)
component.

{% configuration %}

pin:
  description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values are 1, 2, 5, 6, 7 and 9. 
  required: exclusive
zone:
  description: The number corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) board. Valid values are 1, 2, 3, 4, 5 and 6.
  required: exclusive
type:
  description: Any [binary sensor](/components/binary_sensor/) class, typically `door`, `window`, `motion` or `smoke`.
  required: true 
name: 
  description: The name of the device used in the front end.
  required: false
  default: automatically generated

{% endconfiguration%}

**Note:** Either **pin** or **zone** is required for each sensor. Do not use both in the same sensor definition.