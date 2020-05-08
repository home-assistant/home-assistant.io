---
title: "Modbus Climate"
description: "Instructions how to integrate a Modbus thermostat within Home Assistant."
ha_category:
  - Climate
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: modbus
---


The `modbus` thermostat allows you to use a sensor value (current temperature) and target value (target temperature) from [Modbus](http://www.modbus.org/) registers.

## Configuration

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: modbus
    name: Watlow F4T
    hub: hub1
    slave: 1
    data_type: uint
    data_count: 1
    scale: 0.1
    offset: 0
    precision: 1
    max_temp: 30
    min_temp: 15
    temp_step: 1
    target_temp_register: 2782
    current_temp_register: 27586
```

{% configuration %}
name:
  description: Name of the device
  required: true
  type: string
hub:
  description: The name of the hub.
  required: false
  default: default
  type: string
slave:
  description: The number of the slave (Optional for tcp and upd Modbus, use 1).
  required: true
  type: integer
target_temp_register:
  description: Register number for target temperature (Setpoint).
  required: true
  type: integer
current_temp_register:
  description: Register number for current temperature (Process value).
  required: true
  type: integer
current_temp_register_type:
  description: Modbus register type (holding, input) for current temperature, default holding.
  required: false
  type: string
  default: holding
data_type:
  description: Response representation (int, uint, float, custom). If float selected, value will converted to IEEE 754 floating point format.
  required: false
  type: string
  default: float
data_count:
  description: Number of registers to read.
  required: false
  type: integer
  default: 2
precision:
  description: Number of valid decimals.
  required: false
  type: integer
  default: 1
scale:
  description: Scale factor (output = scale * value + offset).
  required: false
  type: float
  default: 1
offset:
  description: Final offset (output = scale * value + offset).
  required: false
  type: float
  default: 0
max_temp:
  description: Maximum setpoint temperature.
  required: false
  type: integer
  default: 35
min_temp:
  description: Maximum setpoint temperature.
  required: false
  type: integer
  default: 5
temp_step:
  description: The supported step size a target temperature can be increased/decreased.
  required: false
  type: float
  default: 0.5
temperature_unit:
  description: Temperature unit reported by the current_temp_register. C or F
  required: false
  type: string
  default: C
{% endconfiguration %}


### Services

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |
