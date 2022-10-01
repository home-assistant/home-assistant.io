---
title: Sum
description: Instructions on how to integrate sum sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 2022.10.0
ha_quality_scale: internal
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: sum
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The Sum integration consumes the state from other sensors to calculate the sum of it's states.

If any source sensor provides an unknown state, this sensor will also be in unknown state.

If the unit of measurement of the sensors differs, the Sum sensor will continue to calculate the sum but provide a warning in the log.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input entities:
  description: At least two entities to sum.
Precision:
  description: Round the calculated sum value to at most N decimal places.
{% endconfiguration_basic %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sum
    entity_ids:
      - sensor.kitchen_temperature
      - sensor.living_room_temperature
      - sensor.office_temperature
```

{% configuration %}
entity_ids:
  description: At least two entities to sum. The unit of measurement of the first entry will be the one that's used.
  required: true
  type: [list, string]
name:
  description: Name of the sensor to use in the frontend.
  required: false
  type: string
round_digits:
  description: Round the calculated sum value to at most N decimal places.
  required: false
  type: integer
  default: 2
unique_id:
  description: Unique id you can provide to be able to customize the sensor in the UI.
  required: false
  type: string
{% endconfiguration %}
