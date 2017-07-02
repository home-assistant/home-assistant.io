---
layout: page
title: "KNX Sensor"
description: "Instructions on how to use the KNX Sensor with Home Assistant."
date: 2016-08-20 22:24
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Sensor
ha_release: 0.29
ha_iot_class: "Local Push"
---

The `knx` sensor platform allows you to monitor [KNX](http://www.knx.org) sensors. 

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

There is currently support for the following KNX data point types:

| Condition           | KNX Datapoint Type  | Unit of measurement | Data type                      |
| :-------------------|:--------------------|:--------------------|:-------------------------------|
| Temperature         | 9.001               | °C                  | 2 Byte Float                   |
| Speed (Wind speed)  | 9.005               | m/s                 | 2 Byte Float                   |
| Illuminance (Lux)   | 9.004               | Lux                 | 2 Byte Float                   |
| Percentage          | 5.001               | %                   | 1 Byte Scaled Unsigned Integer |

To use your KNX sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    type: temperature
    address: 1/0/3

  - platform: knx
    name: Wind speed
    type: speed_ms
    address: 1/0/0

  - platform: knx
    name: Lux
    type: illuminance
    address: 1/0/1

  - platform: knx
    name: percent
    type: percentage
    address: 1/0/4
```

Configuration variables:

- **type** (*Required*): The type of the sensor. See table above for available options.
- **address** (*Required*): The address of the sensor on the bus.
- **name** (*Optional*): The name to use in the frontend.
- **minimum** (*Optional*): Minimum sensor value - defaults to a hardcoded default value.
- **maximum** (*Optional*): Maximum sensor value - defaults to a hardcoded default value.

