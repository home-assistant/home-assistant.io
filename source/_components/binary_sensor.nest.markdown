---
layout: page
title: "Nest Binary Sensor"
description: "Instructions on how to integrate Nest binary sensors within Home Assistant."
date: 2016-01-26 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Binary Sensor
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


The `nest` binary sensor platform lets you monitor various states of your [Nest](https://nest.com) devices.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors. The binary sensors will be setup if the `nest` component is configured and the required configuration for the `nest binary sensor` is set.
</p>

To enable binary sensors and customize which sensors are setup, you can extend the [Nest component](/components/nest/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
nest:
  binary_sensors:
    monitored_conditions:
      - 'fan'
      - 'target'
```

By default all binary sensors for your available Nest devices will be monitored. Leave `monitored_conditions` blank to disable all binary sensors for the [Nest component](/components/nest/).

Configuration variables:

- **monitored_conditions** array (*Optional*): States to monitor.

The following conditions are available by device:

- Nest Thermostat:
  - online
  - fan
  - is\_using\_emergency\_heat
  - is\_locked
  - has\_leaf
- Nest Protect:
  - online
- Nest Camera:
  - online
  - motion\_detected
  - person\_detected
  - sound\_detected
