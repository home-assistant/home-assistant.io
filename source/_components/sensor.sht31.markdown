---
layout: page
title: "Sensirion SHT31 Sensor"
description: "Instructions how to integrate SHT31 sensors within Home Assistant."
date: 2018-03-06 19:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: DIY
ha_release: N/A
logo: dht.png
ha_iot_class: "Local Polling"
---


The `sht31` sensor platform allows you to get the current temperature and humidity from a Sensirion SHT31 device.

To use your SHT31 sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: sht31
  name: Bedroom
  i2c_address: 0x44
  monitored_conditions:
    - temperature
    - humidity
```

Configuration variables:

{% configuration %}
  name:
    description: The name of the sensor. Temperature and Humidity will be added to the name for the sensor name.
    required: false
    default: SHT31
    type: string
  i2c_address:
    description: I2C address of the sensor.
    required: false
    default: "`0x44`"
    type: int
  monitored_conditions:
    description: Conditions to monitor.
    required: false
    default: All conditions
    type: list
    keys:
      temperature: 
        description: The current temperature of the SHT31.
      humidity:
        description: The current humidity of the SHT31.
{% endconfiguration %}
