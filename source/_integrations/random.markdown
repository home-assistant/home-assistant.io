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

The **Random** {% term integration %} creates random values or a random state. This is useful when you want to test automation rules or run an interactive demo. It generates a new state every time it is polled.

## Configuration

The preferred way to create a random helper is through the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain=page.ha_domain title=page.title %}**.

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

## Troubleshooting

### The Random helper option is missing from the user interface

#### Symptom

When you go to **{% my helpers title="Settings > Devices & services > Helpers" %}** to add a helper, the **Random** option is not listed.

#### Description

Random helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `random:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your random helpers from the user interface.
