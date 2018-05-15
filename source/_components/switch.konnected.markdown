---
layout: page
title: "Konnected Switch"
description: "Connect wired actuators to Home Assistant with Konnected and a NodeMCU ESP8266"
date: 2018-04-03 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: konnected.png
ha_category: Switch
ha_release: "0.70"
ha_iot_class: "Local Push"
---

The `konnected` switch allows you to actuate an alarm system siren, strobe light, buzzer, or any other wired device using
a [Konnected Alarm Panel board](https://konnected.io) or relay module and a NodeMCU ESP8266 WiFi module running the 
[open source Konnected software](https://github.com/konnected-io/konnected-security).

Please visit the [Konnected.io website](https://konnected.io) for more information about the Konnected Alarm Panel board and compatible
hardware. 

See the [`konnected`](/components/konnected/) component for configuration and setup instructions. 

{% configuration %}

pin:
  description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values are 1, 2, 5, 6, 7 and 8. 
  required: exclusive
zone:
  description: The number corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) board, or the word `out` to specify the dedicated ALARM/OUT terminal on the Konnected board. Valid values are 1, 2, 3, 4, 5 and out.
  required: exclusive
name: 
  description: The name of the device used in the front end.
  required: false
  default: automatically generated
activation:
  description: Either "low" or "high" to specify the state when the switch is turned on.
  default: high
  required: false

{% endconfiguration%}

#### Configuration Notes
- Either **pin** or **zone** is required for each actuator. Do not use both in the same definition.
- Pin `D8` or the `out` zone will only work when activation is set to high (the default).
