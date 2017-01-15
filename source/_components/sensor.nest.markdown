---
layout: page
title: "Nest Sensor"
description: "Instructions how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Sensor
ha_release: pre 0.7
---


The `nest` sensor platform lets you monitor sensors connected to your [Nest](https://nest.com) devices.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors.  The `nest` binary sensor will automatically be setup when you do.
</p>

To customize which sensors are enabled, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nest
    monitored_conditions:
      - 'temperature'
      - 'target'
```

If you leave `monitored_conditions` blank, all sensors that are available for your devices will be included.

Configuration variables:

- **monitored_conditions** array (*Optional*): States to monitor.

The following conditions are available by device:

- Nest Thermostat:
  - humidity
  - operation\_mode
  - temperature
  - target
  - hvac\_state: The currently active state of the HVAC system, `heating`, `cooling`, or `off`.
- Nest Protect:
  - co\_status
  - smoke\_status 
- Nest Camera: none

