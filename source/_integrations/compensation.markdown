---
title: Compensation
description: Instructions on how to integrate compensation sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: '2021.5'
ha_codeowners:
  - '@Petro31'
ha_domain: compensation
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Compensation** {% term integration %} consumes the {% term state %} from other {% term sensors %}. It exports the compensated value as state in a separate {% term entity %} and the following values as attributes: `entity_id` and `coefficients`. A single polynomial, linear by default, is fit to all data points provided.

## Configuration

To enable the compensation sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
compensation:
  media_player_db_volume:
    source: media_player.yamaha_receiver
    attribute: volume_level
    unit_of_measurement: dB
    data_points:
      - [0.2, -80.0]
      - [1.0, 0.0]

  media_player_zone_2_db_volume:
    source: media_player.yamaha_receiver_zone_2
    attribute: volume_level
    unit_of_measurement: dB
    # Ensure that the sensor's value will not have a state lower than -80.0
    # when the source sensors value is less than 0.2
    lower_limit: true
    # Ensure that the sensor's value will not have a state greater than 0.0
    # when the source sensors value is greater than 1.0
    upper_limit: true
    data_points:
      - [0.2, -80.0]
      - [1.0, 0.0]
```

{% configuration %}
source:
  description: The entity to monitor/compensate.
  required: true
  type: string
data_points:
  description: "The collection of data point conversions with the format `[uncompensated_value, compensated_value]`.  e.g., `[1.0, 2.1]`. The number of required data points is equal to the polynomial `degree` + 1. For example, a linear compensation (with `degree: 1`) requires at least 2 data points."
  required: true
  type: list
unique_id:
  description: An ID that uniquely identifies this sensor. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
attribute:
  description: Attribute from the source to monitor/compensate. When omitted the state value of the source will be used.
  required: false
  type: string
degree:
  description: "The degree of a polynomial. e.g., Linear compensation (y = x + 3) has 1 degree, Quadratic compensation (y = x<sup>2</sup> + x + 3) has 2 degrees, etc."
  required: false
  default: 1
  type: integer
precision:
  description: Defines the precision of the calculated values, through the argument of round().
  required: false
  default: 2
  type: integer
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
lower_limit:
  description: "Enables a lower limit for the sensor. The lower limit is defined by the data collections (`data_points`) lowest `uncompensated_value`. For example, if the lowest `uncompensated_value` value is `1.0` and the paired `compensated_value` is `0.0`, any `source` state less than `1.0` will produce a compensated state of `0.0`."
  required: false
  type: boolean
  default: false
upper_limit:
  description: "Enables an upper limit for the sensor. The upper limit is defined by the data collections (`data_points`) greatest `uncompensated_value`. For example, if the greatest `uncompensated_value` value is `5.0` and the paired `compensated_value` is `10.0`, any `source` state greater than `5.0` will produce a compensated state of `10.0`."
  required: false
  type: boolean
  default: false
{% endconfiguration %}
