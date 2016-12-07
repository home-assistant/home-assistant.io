---
layout: page
title: "Nest Binary Sensor"
description: "Instructions how to integrate Nest binary sensors within Home Assistant."
date: 2016-01-26 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Binary Sensor
ha_release: pre 0.7
---


The `nest` binary sensor platform lets you monitor various states of your [Nest](https://nest.com) devices.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors.  The `nest` binary sensor will automatically be setup when you do.
</p>

To customize which binary sensors are enabled, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: nest
    monitored_conditions:
      - 'fan'
      - 'is_using_emergency_heat'
```

If you leave `monitored_conditions` blank, all sensors that are available for your devices will be used.

Configuration variables:

- **monitored_conditions** array (*Optional*): States to monitor.
  - online
  - fan
  - is\_using\_emergency\_heat
  - is\_locked
  - has\_leaf
  - motion\_detected
  - person\_detected
  - sound\_detected

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
