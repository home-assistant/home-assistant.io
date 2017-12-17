---
layout: page
title: "EnOcean Sensor"
description: "Instructions how to integrate TellStick sensors into Home Assistant."
date: 2016-05-26 01:00
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Sensor
ha_release: 0.21
ha_iot_class: "Local Push"
---


The `enocean` sensor platform currently only allows reading out the power measured in a Permundo PSC234 switch.

To use your EnOcean device, you first have to set up your [EnOcean hub](../enocean) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - name: Television
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is a 4 bytes long number.
- **platform** (*Required*): Set to `enocean`.
- **name** (*Required*): An identifier for the switch
