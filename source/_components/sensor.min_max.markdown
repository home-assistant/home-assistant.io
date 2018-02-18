---
layout: page
title: "Min/max Sensor"
description: "Instructions how to integrate min/max sensors into Home Assistant."
date: 2016-10-13 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: "0.31"
---


The `min_max` sensor platform consumes the state from other sensors to determine the `minimum`, `maximum`, `latest (last)` and the `mean` of the collected states. The sensor will always show you the lowest/highest/latest value which was received from all monitored sensors. If you have spikes in your values, it's recommended to filter/equalize your values with a [statistics sensor](/components/sensor.statistics/) first.

This sensor is an alternative to the [template sensor](/components/sensor.template/)'s `value_template:` to get the average of multiple sensors.

{% raw %}
```yaml
{{ ((float(states.sensor.kitchen_temperature.state) + 
     float(states.sensor.living_room_temperature.state) +
     float(states.sensor.office_temperature.state)) / 3) | round(2)
}}
```
{% endraw %}

Sensors with an unknown state will be ignored in the calculation. If the unit of measurement of the sensors differs, the `min_max` sensor will go to an error state where the value is `UNKNOWN` and unit of measurement is `ERR`.

To enable the `min_max` sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: min_max
    sensors:
      my_max_sensor:
        entity_ids:
          - sensor.kitchen_temperature
          - sensor.living_room_temperature
          - sensor.office_temperature
```

{% configuration %}
  sensors:
    description: List of your sensors.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      type:
        description: The type of the sensor.
        required: false
        type: [min | max | last | mean]
        default: max
      round_digits:
        description: Round mean value to specified number of digits.
        required: false
        type: int
        default: 2
      entity_ids:
        description: At least two entities to monitor. All entities must use the same unit of measurement.
        required: true
        type: list
{% endconfiguration %}
