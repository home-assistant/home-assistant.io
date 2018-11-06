---
layout: page
title: "LCN Binary Sensor"
description: "Instructions on how to setup LCN binary sensors within Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Binary Sensor
ha_release: 0.82
ha_iot_class: "Local Push"
---

The `lcn` binary sensor platform allows the monitoring of the following [LCN](http://www.lcn.eu) binary data sources:

- Binary hardware sensors
- Lock state of regulator setpoints

The binary sensor can be used in automation scripts or in conjunction with `template` platforms.


## {% linkable_title Configuration %}

The `lcn` component must be configured correctly, see [LCN component](/components/lcn).

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: lcn
    name: binsensor_1
    friendly_name: "Kitchen window"
    address: "myhome.s0.m7"
    source: "binsensor1"
```

{% configuration %}
name:
  description: "Name of the sensor."
  required: true
  type: string
address:
  description: "[Address](/components/lcn#lcn-addresses) of the module/group."
  required: true
  type: string
source:
  description: "Sensor source ([BINSENSOR](/components/lcn#ports), [SETPOINT](/components/lcn#variables-and-units))."
  required: true
  type: string
friendly_name:
  description: "Name to use in the frontend."
  required: false
  type: string
{% endconfiguration %}