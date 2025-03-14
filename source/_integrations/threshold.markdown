---
title: Threshold
description: Instructions on how to integrate threshold binary sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Helper
  - Utility
ha_iot_class: Local Polling
ha_release: 0.34
ha_quality_scale: internal
ha_domain: threshold
ha_config_flow: true
ha_platforms:
  - binary_sensor
ha_integration_type: helper
---

The threshold integration observes the state of another sensor. If the value is below or higher than the given threshold, then the state of the threshold sensor is changed. It also supports a range if both the upper and lower limits are given.

If the sensor is configured with no hysteresis and the sensor value is equal to the threshold, the sensor is turned off since it is not upper or lower with respect to the threshold.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input sensor:
  description: The entity providing numeric readings to apply the threshold on.
Hysteresis:
  description: The distance the observed value must be from the threshold before the state is changed.
Lower limit:
  description: The lower threshold which the observed value is compared against.
Upper limit:
  description: The upper threshold which the observed value is compared against.
{% endconfiguration_basic %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

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
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
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

## Matrix of state change behavior

### Sensor value rising

| Set           | Turns on when           | Turns off when          |
| ------------- | ----------------------- | ----------------------- |
| only upper    | sensor > (upper + hyst) | never                   |
| only lower    | never                   | sensor > (lower + hyst) |
| upper & lower | sensor > (lower + hyst) | sensor > (upper + hyst) |

### Sensor value falling

| Set           | Turns on when           | Turns off when          |
| ------------- | ----------------------- | ----------------------- |
| only upper    | never                   | sensor < (upper - hyst) |
| only lower    | sensor < (lower - hyst) | never                   |
| upper & lower | sensor < (upper - hyst) | sensor < (lower - hyst) |

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
  - platform: threshold # will switch state not at 0°C/min but
                        # will switch on when value rises above 0.1°C/min
                        # will switch off when value sinks below -0.1°C/min
    entity_id: sensor.temperature_derivative
    upper: 0
    hysteresis: 0.1 # sensor 
    name: temperature rising
```
