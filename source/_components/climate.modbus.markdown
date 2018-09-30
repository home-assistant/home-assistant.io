---
layout: page
title: "Modbus Climate"
description: "Instructions how to integrate a Modbus thermostat within Home Assistant."
date: 2018-01-29 9:35
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Climate
ha_release: 0.68
ha_iot_class: "Local Polling"
---


The `modbus` thermostat allows you to use a sensor value (current temperature) and target value (target temperature) from [Modbus](http://www.modbus.org/) registers.

## {% linkable_title Configuration %}

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: modbus
    name: Watlow F4T
    slave: 1
    target_temp_register: 2782
    current_temp_register: 27586
```

{% configuration %}
name:
  description: Name of the device
  required: true
  type: string
slave:
  description: The number of the slave (Optional for tcp and upd Modbus, use 1).
  required: true
  type: int
target_temp_register:
  description: Register number for target temperature (Setpoint).
  required: true
  type: int
current_temp_register:
  description: Register number for current temperature (Process value).
  required: true
  type: int
data_type:
  description: Response representation (int, uint, float, custom). If float selected, value will converted to IEEE 754 floating point format.
  required: false
  type: string
  default: float
count:
  description: Number of registers to read.
  required: false
  type: int
precision:
  description: Number of valid decimals.
  required: false
  type: int
  default: 0
{% endconfiguration %}


### {% linkable_title Services %}

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |
