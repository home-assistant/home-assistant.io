---
layout: component
title: "CPU speed"
description: "Instructions how to integrate CPU speed within Home Assistant."
date: 2015-10-15 11:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---


The `cpuspeed` sensor platform to allow you to monitor the current CPU speed.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: cpuspeed
  name: CPU 
```

Configuration variables:

- **name** (*Optional*): Name of the sensor.
