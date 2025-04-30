---
title: Random
description: Instructions on how to integrate random numbers into Home Assistant.
ha_category:
  - Binary sensor
  - Helper
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: 0.32
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: random
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: helper
ha_config_flow: true
---

The `random` integration simply creates random values or state. This can be useful if you want to test automation rules or run an interactive demo. It generates a new state every time it is polled.


## Configuration
The preferred way to configure random helpers is via the user interface at **{% my helpers title="Settings > Devices & services > Helpers" %}** and select the add button; next, select the {% my config_flow_start domain=page.ha_domain title=page.title %} option.

To be able to add Helpers via the user interface, you should have `default_config:` in your {% term "`configuration.yaml`" %}. It should already be there by default unless you removed it. If you removed `default_config:` from your configuration, you must add `random:` to your {% term "`configuration.yaml`" %} first, then you can use the UI.

## Binary sensor
The random binary sensor creates random states (`true`, 1, `on` or `false`, 0, `off`).

### YAML configuration
To create the random binary sensor, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: random
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Random binary sensor
{% endconfiguration %}

## Sensor
The random sensor creates random sensor values (integers) out of a given range. Returned values form a [discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution), meaning that each integer value in the range configured is equally likely to be drawn.

### YAML configuration
To create the random sensor, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: random
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Random sensor
minimum:
  description: Lower limit for the values.
  required: false
  type: string
  default: 0
maximum:
  description: Upper limit for the values.
  required: false
  type: integer
  default: 20
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
{% endconfiguration %}
