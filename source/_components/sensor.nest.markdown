---
layout: component
title: "Nest thermostat sensor"
description: "Instructions how to integrate Nest thermostats sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Sensor
---


The `nest` sensor platform let you monitor a thermostat from [Nest](https://nest.com). It also includes the ability to monitor things like the state of our HVAC system and the current humidity and temperature.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  platform: nest
  monitored_conditions:
    - 'temperature',
    - 'target',
    - 'away_temperature[0]',
    - 'away_temperature[1]'
    - 'humidity',
    - 'mode',
    - 'last_ip',
    - 'local_ip',
    - 'last_connection',
    - 'battery_level'
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.

You must have the [Nest Thermostat](https://home-assistant.io/components/thermostat.nest/) entity configured to use this sensor.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/nest-thermostat-card.png' />
</p>
