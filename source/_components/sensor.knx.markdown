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

To use your KNX sensor in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    name: Heating.Valve1
    address: '2/0/0'
    type: 'percent'
  - platform: knx
    name: Kitchen.Temperature
    address: '6/2/1'
    type: 'temperature'
```

- **name** (*Optional*): A name for this device used within Home Assistant.
- **address**: KNX group address of the sensor.
- **type** (Optional): "percent", "temperature", "humidity", "illuminance", "brightness", "speed_ms", "current", "power", "electric_current", "electric_potential", "energy", "frequency", "heatflowrate", "phaseanglerad", "phaseangledeg", "powerfactor" or "speed".

