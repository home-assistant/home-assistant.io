---
layout: page
title: "Modbus"
description: "Instructions how to integrate a Modbus thermostat within Home Assistant."
date: 2018-01-29 9:35
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Thermostat
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The `modbus` thermostat allows you to use a sensor value (current temperature)
and target value (target temperature) from [Modbus](http://www.modbus.org/)
registers.

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
climate:
  - platform: modbus
    name: Watlow F4T
    # Modbus TCP
    slave: 1
    # Control Loop 1 Setpoint
    target_temp_register: 2782
    # Universal Input 1 Module 1
    current_temp_register: 27586
    data_type: float
    min_temp: 15
    max_temp: 25

```

Configuration variables:

  - **name** (*Required*): Name of the sensor.
  - **slave** (*Required*): The number of the slave (Optional for tcp and upd Modbus).
  - **target_temp_register** (*Required*): Register number for target temperature (Setpoint)
  - **current_temp_register** (*Required*): Register number for current temperature (Setpoint)
  - **data_type** (*Optional*): Response representation (int, uint, float, custom). If float selected, value will be converted to IEEE 754 floating point format. Default float.
  - **count** (*Optional*): Number of registers to read.
  - **precision** (*Optional*): Number of valid decimals, default 0.
  - **min_temp** (*Optional*): Minimum value that can be set for the target temperature
  - **max_temp** (*Optional*): Maximum value that can be set for the target temperature

### {% linkable_title Services %}

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |
