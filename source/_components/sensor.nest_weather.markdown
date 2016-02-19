---
layout: page
title: "Nest Weather Sensor"
description: "Instructions how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Weather
---


The `nest` weather sensor platform let you monitor current weather conditions based on the location of your [Nest](https://nest.com) thermostat.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  platform: nest
  monitored_conditions:
    - 'weather_temperature'
    - 'weather_humidity'
    - 'weather_condition'
    - 'wind_speed'
    - 'wind_direction'
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.
    - 'weather_temperature'
    - 'weather_humidity'
    - 'weather_condition'
    - 'wind_speed'
    - 'wind_direction'

<p class='note'>You must have the [Nest component](/components/nest/) configured to use this sensor.</p>
