---
title: Modbus Sensor
description: "Instructions on how to integrate Modbus sensors into Home Assistant."
ha_category:
  - Sensor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: modbus
---

The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

## Configuration

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: modbus
  registers:
    - name: Sensor1
      hub: hub1
      unit_of_measurement: °C
      slave: 1
      register: 100
    - name: Sensor2
      hub: hub1
      unit_of_measurement: mg
      slave: 1
      register: 110
      count: 2
    - name: Sensor3
      hub: hub1
      unit_of_measurement: °C
      slave: 1
      register: 120
      register_type: input
      data_type: float
      scale: 0.01
      offset: -273.16
      precision: 2
```

{% configuration %}
registers:
  description: The array contains a list of relevant registers to read from.
  required: true
  type: map
  keys:
    name:
      description: Name of the sensor.
      required: true
      type: string
    hub:
      description: The name of the hub.
      required: false
      default: modbus_hub
      type: string
    slave:
      description: The number of the slave (Optional for tcp and upd Modbus).
      required: true
      type: integer
    register:
      description: Register number.
      required: true
      type: integer
    register_type:
      description: Modbus register type (holding, input), default holding.
      required: false
      type: string
    unit_of_measurement:
      description: Unit to attach to value.
      required: false
      type: integer
    device_class:
      description: The [type/class](/integrations/sensor/#device-class) of the sensor to set the icon in the frontend.
      required: false
      type: device_class
      default: None
    count:
      description: Number of registers to read.
      required: false
      type: integer
      default: 1
    reverse_order:
      description: Reverse the order of registers when count >1.
      required: false
      default: false
      type: boolean
    scale:
      description: Scale factor (output = scale * value + offset).
      required: false
      default: 1
      type: float
    offset:
      description: Final offset (output = scale * value + offset).
      required: false
      default: 0
      type: float
    precision:
      description: Number of valid decimals.
      required: false
      default: 0
      type: integer
    data_type:
      description: Response representation (int, uint, float, string, custom). If float selected, value will be converted to IEEE 754 floating point format.
      required: false
      default: int
      type: string
    structure:
      description: "If `data_type` is custom specified a double-quoted Python struct is expected here, to format the string to unpack the value. See Python documentation for details. Example: `>i`."
      required: false
      type: string
{% endconfiguration %}

It's possible to change the default 30 seconds scan interval for the sensor updates as shown in the [Platform options](/docs/configuration/platform_options/#scan-interval) documentation.

<div class='note'>

If you specify scale or offset as floating point values, double precision floating point arithmetic will be used to calculate final value. This can cause loss of precision for values that are larger than 2^53.

</div>

### Full example

Example a temperature sensor with a 10 seconds scan interval:

```yaml
sensor:
- platform: modbus
  scan_interval: 10
  registers:
    - name: Room_1
      hub: hub1
      slave: 10
      register: 0
      register_type: holding
      unit_of_measurement: °C
      count: 1
      scale: 0.1
      offset: 0
      precision: 1
      data_type: integer
```
