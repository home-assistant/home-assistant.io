---
layout: page
title: "LCN Sensor"
description: "Instructions on how to setup LCN sensors within Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Sensor
ha_release: 0.82
ha_iot_class: "Local Push"
---

The `lcn` sensor platform allows the monitoring of the following [LCN](http://www.lcn.eu) data sources:

- Variables
- Regulator setpoints
- Thresholds
- S0 inputs
- LED states
- Logic operation states
- Lock state of keys

The sensor can be used in automation scripts or in conjunction with `template` platforms.

<p class='note'>
  Ensure that the LCN module is configured properly to provide the requested value.
  Otherwise the module might show unexpected behavior or return error messages.
</p>


## {% linkable_title Configuration %}

The `lcn` component must be configured correctly, see [LCN component](/components/lcn).

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: lcn
    name: sensor_var3
    friendly_name: "Temperature"
    address: "myhome.s0.m7"
    source: "var3"
    unit_of_measuremnt: "celsius"
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
  description: "Sensor source ([VARIABLE](/components/lcn#variables-and-units), [SETPOINT](/components/lcn#variables-and-units), [THRESHOLD](/components/lcn#variables-and-units), [S0_INPUT](/components/lcn#variables-and-units), [LED_PORT](/components/lcn#ports), [LOGICOP_PORT](/components/lcn#ports), [KEYS](/components/lcn#keys))."
  required: true
  type: string
unit_of_measurement:
  description: Measurement unit ([VAR_UNIT](#variables-and-units)).
  required: false
  type: string
  default: 'native'
friendly_name:
  description: "Name to use in the frontend."
  required: false
  type: string
{% endconfiguration %}