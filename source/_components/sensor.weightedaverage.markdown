---
layout: page
title: "Weighted Average Sensor"
description: "Instructions on how to add weighted average sensors within Home Assistant."
date: 2019-06-01 01:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category:
  - Sensor
ha_release: 0.93
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `weightedaverage` sensor calculates an average value from another sensor, that is weighted according to the duration for each individual sensor value.
This is useful when the source sensor state is updated at uneven intervals, typically a temperature sensor that is only updated when the temperature changes. The weighted average takes into account the 'weight' (i.e. the duration) for each temperature.
The sensor also records the maximum and minimum sensor values for the given duration, as well as the top rates at which the sensor value has ascended or descended.


## {% linkable_title Configuration %}

To add the weighted average sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: weightedaverage
    name: daily_average_temperature
    friendly_name: 'Daily Average Temperature'
    entity_id: sensor.temperature
    unit_of_measurement: '°C'
    device_class: temperature
    round_values: 1
    round_rates: 5
    at_even_timestamps: True
    sample_time:
      - days: 1
    update_interval:
      - hours: 1
```
