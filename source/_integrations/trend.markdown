---
title: Trend
description: Instructions on how to integrate Trend binary sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Helper
  - Utility
ha_release: 0.28
ha_iot_class: Calculated
ha_quality_scale: internal
ha_domain: trend
ha_platforms:
  - binary_sensor
ha_config_flow: true
ha_integration_type: helper
ha_codeowners:
  - '@jpbede'
---

The `trend` platform allows you to create sensors which show the trend of
numeric `state` or`state_attributes` from other entities. This sensor requires
at least two updates of the underlying sensor to establish a trend.
Thus it can take some time to show an accurate state. It can be useful
as part of automations, where you want to base an action on a trend.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Entity that the sensor tracks:
  description: The sensor entity that is to be tracked and whose trend is to be detected.
Attribute of the entity that the sensor tracks:
  description: The attribute of the previous selected sensor entity that this sensor tracks. If no attribute is specified then the sensor will track the state.
Invert the result:
  description: Invert the result. A `true` value would mean descending rather than ascending.
{% endconfiguration_basic %}

### YAML Configuration

To enable Trend binary sensors in your installation,
add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: trend
    sensors:
      cpu_speed:
        entity_id: sensor.cpu_speed
```

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    entity_id:
      description: The entity that this sensor tracks.
      required: true
      type: string
    attribute:
      description: >
        The attribute of the entity that this sensor tracks.
        If no attribute is specified then the sensor will track the state.
      required: false
      type: string
    device_class:
      description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
      required: false
      type: string
    friendly_name:
      description: Name to use in the Frontend.
      required: false
      type: string
    invert:
      description: >
        Invert the result. A `true` value would
        mean descending rather than ascending.
      required: false
      type: boolean
      default: false
    max_samples:
      description: Limit the maximum number of stored samples.
      required: false
      type: integer
      default: 2
    min_samples:
      description: The minimum number of samples that must be collected before the gradient can be calculated.
      required: false
      type: integer
      default: 2
    min_gradient:
      description: >
        The minimum rate at which the observed value
        must be changing for this sensor to switch on.
        The gradient is measured in sensor units per second.
      required: false
      type: string
      default: 0.0
    sample_duration:
      description: >
        The duration **in seconds** to store samples for.
        Samples older than this value will be discarded.
      required: false
      type: integer
      default: 0
{% endconfiguration %}

## Using Multiple Samples

If the optional `sample_duration` and `max_samples` parameters are specified
then multiple samples can be stored and used to detect long-term trends.

Each time the state changes, a new sample is stored along with the sample time. Samples older than `sample_duration` seconds will be discarded. The `max_samples` parameter must be large enough to store sensor updates over the requested duration. If you want to trend over two hours and your sensor updates every 120s then `max_samples` must be at least 60, i.e., 7200/120 = 60.

A trend line is then fitted to the available samples, and the gradient of this
line is compared to `min_gradient` to determine the state of the trend sensor.
The gradient is measured in sensor units per second - so if you want to know
when the temperature is falling by 2 degrees per hour,
use a gradient of (-2) / (60 x 60) = -0.00055

The current number of stored samples is displayed on the States page.

## Examples

In this section you find some real-life examples of how to use this sensor.

This example indicates `true` if the sun is still rising:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      sun_rising:
        entity_id: sun.sun
        attribute: elevation
```

This example creates two sensors to indicate whether the temperature is
rising or falling at a rate of at least 3 degrees an hour,
and collects samples over a two hour period:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      temp_falling:
        entity_id: sensor.outside_temperature
        sample_duration: 7200
        max_samples: 120
        min_samples: 20
        min_gradient: -0.0008
        device_class: cold

      temp_rising:
        entity_id: sensor.outside_temperature
        sample_duration: 7200
        max_samples: 120
        min_samples: 20
        min_gradient: 0.0008
        device_class: heat
```
