---
layout: page
title: "EnOcean Binary Sensor"
description: "Instructions on how to set up EnOcean binary sensors within Home Assistant."
date: 2016-05-25 23:49
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Binary Sensor
---

This can typically be one of those batteryless wall switches. Currently only one type has been tested: Eltako FT55.


To use your EnOcean device, you first have to set up your [EnOcean hub](../enocean) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is the 4 bytes long number written on the dimmer.
- **platform** (*Required*): Set to `enocean`.
