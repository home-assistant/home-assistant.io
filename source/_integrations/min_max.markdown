---
title: Min/Max
description: Instructions on how to integrate min/max sensors into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.31
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: min_max
ha_platforms:
  - sensor
---

The `min_max` sensor platform consumes the state from other sensors to determine the minimum, maximum, latest (last), mean and median of the collected states. The sensor will always show you the lowest/highest/latest value which was received from all monitored sensors. If you have spikes in your values, it's recommended to filter/equalize your values with a [statistics sensor](/integrations/statistics) first.

This sensor is an alternative to the [template sensor](/integrations/template)'s `value_template:` to get the average or the median of multiple sensors.

{% raw %}

```yaml
{{ ((float(states('sensor.kitchen_temperature')) +
     float(states('sensor.living_room_temperature')) +
     float(states('sensor.office_temperature'))) / 3) | round(2)
}}
```

{% endraw %}

Sensors with an unknown state will be ignored in the calculation. If the unit of measurement of the sensors differs, the `min_max` sensor will go to an error state where the value is `UNKNOWN` and unit of measurement is `ERR`.

## Configuration

To enable the `min_max` sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: min_max
    entity_ids:
      - sensor.kitchen_temperature
      - sensor.living_room_temperature
      - sensor.office_temperature
```

{% configuration %}
entity_ids:
  description: At least two entities to monitor. The unit of measurement of the first entry will be the one that's used. All entities must use the same unit of measurement.
  required: true
  type: [list, string]
type:
  description: "The type of sensor: `min`, `max`, `last`, `mean` or `median`."
  required: false
  default: max
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  type: string
round_digits:
  description: Round mean or median value to specified number of digits.
  required: false
  type: integer
  default: 2
{% endconfiguration %}
