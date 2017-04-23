---
layout: page
title: Modbus Sensor
description: "Instructions how to integrate Modbus sensors into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Sensor
ha_release: pre 0.7
---


The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
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
      scale: 0.01
      offset: -273.16
      precision: 2
```

Configuration variables:

- **registers** array (*Required*): The array contains a list of relevant registers to read from.
  - **name** (*Required*): Name of the sensor.
  - **slave** (*Required*): The number of the slave (Optional for tcp and upd Modbus).
  - **register** (*Required*): Register number.
  - **unit_of_measurement** (*Optional*): Unit to attach to value.
  - **count** (*Optional*): Number of registers to read.
  - **scale** (*Optional*): Scale factor (output = scale * value + offset), default 1
  - **offset** (*Optional*): Final offset (output = scale * value + offset), default 0
  - **precision** (*Optional*): Number of valid decimals, default 0
