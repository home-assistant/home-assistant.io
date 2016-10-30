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
ha_release: pre 0.7
---


The `nest` sensor platform let you monitor sensors connected to your [Nest](https://nest.com) thermostat and/or your Nest Protect Smoke Alarm.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use those sensors.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: nest
  monitored_conditions:
    - 'temperature'
    - 'target'
    - 'humidity'
    - 'operation_mode'
    - 'last_connection'
    - 'co_status' # Nest Protect only
    - 'smoke_status' # Nest Protect only
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.
  - 'temperature'
  - 'target'
  - 'humidity'
  - 'operation_mode'
  - 'last_ip'
  - 'local_ip'
  - 'last_connection'
  - 'battery_level'
  - 'weather_condition'
  - 'weather_temperature'
  - 'weather_humidity'
  - 'wind_speed'
  - 'wind_direction'
  - 'co_status' # Nest Protect only
  - 'smoke_status' # Nest Protect only

