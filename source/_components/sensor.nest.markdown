---
layout: page
title: "Nest Sensor"
description: "Instructions on how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Sensor
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


The `nest` sensor platform lets you monitor sensors connected to your [Nest](https://nest.com) devices.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors. The sensors will be setup if the `nest` component is configured and the required configuration for the `nest sensor` is set.
</p>

To enable sensors and customize which sensors are setup, you can extend the [Nest component](/components/nest/) configuration in your `configuration.yaml` file with the following settings:
```yaml
# Example configuration.yaml entry
nest:
  sensors:
    monitored_conditions:
      - 'temperature'
      - 'target'
```

By default all sensors for your available Nest devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the [Nest component](/components/nest/).

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
  - battery\_health
- Nest Camera: none

