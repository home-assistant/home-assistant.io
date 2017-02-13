---
layout: page
title: "Sense HAT"
description: "Instructions how to integrate Sense HAT within Home Assistant."
date: 2016-12-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sense-hat.png
ha_category: Sensor
ha_release: 0.35
ha_iot_class: "Local Push"
---


The `sensehat` sensor platform allows you to display information collected by a [Sense HAT](https://www.raspberrypi.org/products/sense-hat/) add-on board for Raspberry Pi.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sensehat
    display_options:
        - temperature
        - humidity
        - pressure
```

Configuration variables:

- **display_options** (*Requires*) array: List of details to monitor. Defaults is `memory_free`.
  - 'temperature'
  - 'humidity'
  - 'pressure'


