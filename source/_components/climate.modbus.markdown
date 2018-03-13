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
ha_release: 0.66
ha_iot_class: "Local Polling"
---


The `modbus` thermostat allows you to use a sensor value (current temperature)
and target value (target temperature) from [Modbus](http://www.modbus.org/)
registers.

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
climate:
  - platform: modbus
    name: Watlow F4T
    slave: 1
    target_temp_register: 2782
    current_temp_register: 27586

```

{% configuration %}
  - **name** (*Required*): Name of the sensor.
  - **slave** (*Required*): The number of the slave (Optional for tcp and upd Modbus).
  - **target_temp_register** (*Required*): Register number for target temperature (Setpoint)
  - **current_temp_register** (*Required*): Register number for current temperature (Setpoint)
  - **data_type** (*Optional*): Response representation (int, uint, float, custom). If float selected, value will be converted to IEEE 754 floating point format. Default float.
  - **count** (*Optional*): Number of registers to read.
  - **precision** (*Optional*): Number of valid decimals, default 0.
{% endconfiguration %}


### {% linkable_title Services %}

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |
