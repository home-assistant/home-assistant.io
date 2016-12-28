---
layout: page
title: "SMA Solar WebConnect"
description: "Instructions on how to connect your SMA Inverter to Home Assistant."
date: 2015-12-28 21:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
logo: sma.png
ha_iot_class: "Cloud Polling"
ha_release: 0.36
---


The `sma` sensor will poll a SMA solar inverter and present the values as sensors (or attributes of sensors) in Home Assistant.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sma
    ip:
    password: !secret sma_password
    sensors:
      - CURRENT_POWER:
      - CURRENT_CONSUMPTION: [TOTAL_CONSUMPTION]
    keys:
      - 
```

Configuration variables:

- **ip** (*Required*): The IP address of the SMA WebConnect module.
- **password** (*Required*): The password of the SMA WebConnect module.
- **group** (*Optional*): The user group, which can be either `user` (the default) or `installer`.
- **sensors** (*Required*): A list of sensors that will be added.
- **keys** (*Optional*): A dictionary of `SENSOR_NAME: SENSOR_KEY` values (e.g. `YESTERDAY_CONSUMPTION_KWH: "6400_00543A01"`). These sesnors will be added to the standard ones in the [pysma library](https://github.com/kellerza/pysma/blob/master/pysma/__init__.py#L18)

Sensor configuration:

The sensors can be any one of the following:
- current_power
- current_consumption
- total_power
- total_consumption

You can also create composite sensors, where the sub-sensors will be attributes of the main sensor, e.g.

```yaml
    sensors:
      - current_power: [total_power, total_consumption]
```
