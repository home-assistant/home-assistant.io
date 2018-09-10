---
layout: page
title: "Nest Weather Sensor"
description: "Instructions on how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Weather
ha_iot_class: "Cloud Polling"
---

<p class='note warning'>
**This platform is currently not available. It's possible that `nest_weather` will be removed in the future.**
</p>


The `nest` weather sensor platform let you monitor current weather conditions based on the location of your [Nest](https://nest.com) thermostat.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use those sensors.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  - platform: nest
    monitored_conditions:
      - 'weather_temperature'
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.
  - 'weather_temperature'
  - 'weather_humidity'
  - 'weather_condition'
  - 'wind_speed'
  - 'wind_direction'

