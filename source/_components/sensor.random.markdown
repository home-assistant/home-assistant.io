---
layout: page
title: "Random Sensor"
description: "Instructions how to integrate random number sensors into Home Assistant."
date: 2016-10-30 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.32
---


The `random` sensor platform is creating random sensor values (integers) out of a given range. This can be useful if you want to test automation rules. 

To enable the random sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: random
```

Configuration variables:

- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Random Sensor`.
- **minimum** (*Optional*): Lower limit for the values. Defaults to `0`.
- **maximum** (*Optional*): Upper limit for the values. Defaults to `20`.

