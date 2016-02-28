---
layout: page
title: "Nest Sensor"
description: "Instructions how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Sensor
---


The `nest` sensor platform let you monitor sensors connected to your [Nest](https://nest.com) thermostat.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  platform: nest
  monitored_conditions:
    - 'temperature'
    - 'target'
    - 'away_temperature[0]'
    - 'away_temperature[1]'
    - 'humidity'
    - 'mode'
    - 'last_ip'
    - 'local_ip'
    - 'last_connection'
    - 'battery_level'
    - 'weather_condition'
    - 'weather_temperature'
    - 'weather_humidity'
    - 'wind_speed'
    - 'wind_direction'
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.
  - 'temperature'
  - 'target'
  - 'away_temperature[0]'
  - 'away_temperature[1]'
  - 'humidity'
  - 'mode'
  - 'last_ip'
  - 'local_ip'
  - 'last_connection'
  - 'battery_level'
  - 'weather_condition'
  - 'weather_temperature'
  - 'weather_humidity'
  - 'wind_speed'
  - 'wind_direction'

<p class='note'>You must have the [Nest component](/components/nest/) configured to use this sensor.</p>
