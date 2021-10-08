---
title: Threshold
description: Instructions on how to integrate threshold binary sensors into Home Assistant.
ha_category:
  - Utility
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.34
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: threshold
ha_platforms:
  - binary_sensor
---

The `threshold` binary sensor platform observes the state of another sensor. If the value is below (`lower`) or higher (`upper`) than the given threshold then state of the threshold sensor is changed. It support also a range if `lower` and `upper` are given.

If the sensor is configured with no hysteresis and the sensor value is equal to the threshold, the sensor is turned off since it is not `lower` or `upper` with respect to the threshold.

It's an alternative to the template binary sensor's `value_template:` to get the abnormal/too high/too low states.

{% raw %}

```yaml
{{ states('sensor.furnace') > 2.5 }}
```

{% endraw %}

## Configuration

To enable the threshold sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: threshold
    entity_id: sensor.random
    lower: 20
```

{% configuration %}
entity_id:
  description: "The entity to monitor. Only [sensors](/integrations/sensor/) are supported."
  required: true
  type: string
lower:
  description: The lower threshold which the observed value is compared against.
  required: false
  type: float
upper:
  description: The upper threshold which the observed value is compared against.
  required: false
  type: float
hysteresis:
  description: The distance the observed value must be from the threshold before the state is changed.
  required: false
  type: float
  default: 0.0
name:
  description:  Name of the sensor to use in the frontend.
  required: false
  type: string
  default: Threshold
{% endconfiguration %}

## Examples

### Is the temperature rising or falling

The hysteresis parameter can be used in this use-case to avoid frequent state changes around the maximum or the minimum of a temperature curve. We also have to utilize the [derivative sensor](/integrations/derivative/) for this use-case:

```yaml
sensor:  
  - platform: derivative # will be positive for rising temperatures and negative for falling temperatures
    source: sensor.temperature
    unit_time: min
    name: temperature derivative
    time_window: 00:05:00
binary_sensor:
  - platform: threshold # will switch state not at 0°C/min but 0.1°C/min or -0.1°C/min depending on the current state of the sensor, respectively
    entity_id: sensor.temperature_derivative
    upper: 0
    hysteresis: 0.1 # sensor 
    name: temperature rising
```
