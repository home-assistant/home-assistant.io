---
layout: page
title: "Sensirion SHT31 Smart-Gadget"
description: "Instructions on how to integrate Sensirion SHT31 Smart-Gadget within Home Assistant."
date: 2018-05-17 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: sensirion.png
ha_category: Sensor
ha_release: 0.70
ha_iot_class: "Local Polling"
---

The `sensirion_sht31_smart_gadget` sensor platform allows you to get the current battery, temperature and humidity from a Sensirion SHT31 Smart-Gadget device.

## {% linkable_title Configuration %}

To use your Sensirion SHT31 Smart-Gadget sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sensirion_sht31_smart_gadget
    mac: DEVICE_MAC
    name: SHT31 Smart-Gadget
    monitored_conditions:
      - battery
      - temperature
      - humidity
```

{% configuration %}
  name:
    description: The name of the sensor. Battery, Temperature and Humidity will be added to the name for the sensor name.
    required: false
    default: SHT31 Smart-Gadget
    type: string
  mac:
    mac: Mac address of the sensor.
    required: true
    type: string
  monitored_conditions:
    description: Conditions to monitor.
    required: false
    default: All conditions
    type: list
    keys:
      battery:
        description: The current battery of the SHT31 Smart-Gadget.
      temperature:
        description: The current temperature of the SHT31 Smart-Gadget.
      humidity:
        description: The current humidity of the SHT31 Smart-Gadget.
{% endconfiguration %}
