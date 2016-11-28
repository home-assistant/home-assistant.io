---
layout: page
title: "Modbus Binary Sensor"
description: "Instructions on how to set up Modbus binary sensors within Home Assistant."
date: 2016-09-13 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Binary Sensor
ha_release: 0.28
ha_iot_class: "Local Push"
---

The `modbus` binary sensor allows you to gather data from [Modbus](http://www.modbus.org/) coils.

To use your Modbus binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
binary_sensor:
  - platform: modbus
    coils:
      - name: Sensor1
        slave: 1
        coil: 100
      - name: Sensor2
        slave: 1
        coil: 110
```

Configuration variables:

- **coils** array (*Required*): The array contains a list of coils to read from.
  - **name** (*Required*): Name of the sensor.
  - **slave** (*Required*): The number of the slave (Optional for TCP and UDP Modbus).
  - **coil** (*Required*): Coil number.
