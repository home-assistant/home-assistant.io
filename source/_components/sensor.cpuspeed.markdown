---
layout: page
title: "CPU speed"
description: "Instructions on how to integrate CPU speed within Home Assistant."
date: 2015-10-15 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: cpu.png
ha_category: System Monitor
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The `cpuspeed` sensor platform to allow you to monitor the current CPU speed.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cpuspeed
```

Configuration variables:

- **name** (*Optional*): Name of the sensor.
