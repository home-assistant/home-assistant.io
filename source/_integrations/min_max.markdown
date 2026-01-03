---
title: Min/Max
description: Instructions on how to integrate min/max sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: 0.31
ha_quality_scale: internal
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: min_max
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The Min/Max integration consumes the state from other sensors to determine the minimum, maximum, latest (last), mean, median, range and sum of the collected states.

The sensor provided by this integration will always show you the lowest/highest/latest value which was received from all monitored sensors. If you have spikes in your values, it's recommended to filter/equalize your values with a [statistics sensor](/integrations/statistics) first.

If the source sensor provides an unknown state, it will be ignored in the calculation except for sum where it will set the state to unknown. If the unit of measurement of the sensors differs, the Min/Max sensor will go to an error state where the value is `UNKNOWN` and unit of measurement is `ERR`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input entities:
  description: At least two entities to monitor. All entities must use the same unit of measurement.
Type:
  description: The type of the sensor, this can be either "min", "max", "last", "mean", "median", "range" or "sum".
Precision:
  description: Round the calculated mean, median or sum value to at most N decimal places.
{% endconfiguration_basic %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

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
  description: "The type of sensor: `min`, `max`, `last`, `mean`, `median`, `range` or `sum`."
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
unique_id:
  description: Unique id to be able to configure the entity in the UI.
  required: false
  type: string
{% endconfiguration %}
