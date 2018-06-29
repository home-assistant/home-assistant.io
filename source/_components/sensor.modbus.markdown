---
layout: page
title: Modbus Sensor
description: "Instructions on how to integrate Modbus sensors into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Sensor
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

## {% linkable_title Configuration %}

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: modbus
  registers:
    - name: Sensor1
      unit_of_measurement: °C
      slave: 1
      register: 100
    - name: Sensor2
      unit_of_measurement: mg
      slave: 1
      register: 110
      count: 2
    - name: Sensor3
      unit_of_measurement: °C
      slave: 1
      register: 120
      register_type: input
      data_type: float
      scale: 0.01
      offset: -273.16
      precision: 2
```

Configuration variables:

- **registers** array (*Required*): The array contains a list of relevant registers to read from.
  - **name** (*Required*): Name of the sensor.
  - **slave** (*Required*): The number of the slave (Optional for tcp and upd Modbus).
  - **register** (*Required*): Register number.
  - **register_type** (*Optional*): Modbus register type (holding, input), default holding.
  - **unit_of_measurement** (*Optional*): Unit to attach to value.
  - **count** (*Optional*): Number of registers to read.
  - **reverse_order** (*Optional*): Reverse the order of registers when count >1, default False.
  - **scale** (*Optional*): Scale factor (output = scale * value + offset), default 1.
  - **offset** (*Optional*): Final offset (output = scale * value + offset), default 0.
  - **precision** (*Optional*): Number of valid decimals, default 0.
  - **data_type** (*Optional*): Response representation (int, uint, float, custom). If float selected, value will be converted to IEEE 754 floating point format. Default int.
  - **structure** (*Optional*): If data_type is custom specify here a double quoted python struct format string to unpack the value. See python documentation for details. Ex: ">i".

It's possible to change the default 30 seconds scan interval for the sensor updates as shown in the [Platform options](/docs/configuration/platform_options/#scan-interval) documentation.

### {% linkable_title Full example %}

Example a temperature sensor with a 10 seconds scan interval:

```yaml
sensor:
- platform: modbus
  scan_interval: 10
  registers:
    - name: Room_1
      slave: 10
      register: 0
      register_type: holding
      unit_of_measurement: °C
      count: 1
      scale: 0.1
      offset: 0
      precision: 1
      data_type: int
```
