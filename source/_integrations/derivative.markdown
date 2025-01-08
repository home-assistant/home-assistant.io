---
title: Derivative
description: Instructions on how to integrate Derivative Sensor into Home Assistant.
ha_category:
  - Energy
  - Helper
  - Sensor
  - Utility
ha_release: 0.105
ha_iot_class: Calculated
ha_qa_scale: internal
ha_codeowners:
  - '@afaucogney'
ha_domain: derivative
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The derivative ([Wikipedia](https://en.wikipedia.org/wiki/Derivative)) integration creates a sensor that estimates the derivative of the
values provided by another sensor (the **source sensor**). Derivative sensors are updated upon changes of the **source sensor**.

For sensors that reset to zero after a power interruption and need a "non-negative derivative", such as bandwidth counters in routers, or rain gauges, you can now use this integration directly. Ensure that the input sensor has a `total_increasing` state class, as this is necessary for the integration to handle resets correctly without registering significant changes in the derivative sensor.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input sensor:
  description: The entity providing numeric readings to create the derivative of.
Precision:
  description: Round the calculated derivative value to at most N decimal places.
Time window:
  description: The time window in which to calculate the derivative. Derivatives in this window will be averaged with a simple moving average algorithm (SMA) weighted by time. This is for instance useful for a sensor that outputs discrete values, or to filter out short duration noise. By default the derivative is calculated between two consecutive updates without any smoothing.
Metric Prefix:
  description: Metric unit to prefix the derivative result ([Wikipedia](https://en.wikipedia.org/wiki/Unit_prefix)).
Time unit:
  description: SI unit of time of the derivative. If this parameter is set, the unit of measurement will be set to **x/y** where **x** is the unit of the source sensor and **y** is the value of this parameter.
{% endconfiguration_basic %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. To enable the Derivative sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: derivative
    source: sensor.current_speed
```

{% configuration %}
source:
  description: The entity ID of the sensor providing numeric readings
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: source entity ID derivative
  type: string
round:
  description: Round the calculated derivative value to at most N decimal places.
  required: false
  default: 3
  type: integer
unit_prefix:
  description: Metric unit to prefix the derivative result ([Wikipedia](https://en.wikipedia.org/wiki/Unit_prefix)). Available symbols are "n" (1e-9), "µ" (1e-6), "m" (1e-3), "k" (1e3), "M" (1e6), "G" (1e9), "T" (1e12).
  required: false
  default: None
  type: string
unit_time:
  description: SI unit of time of the derivative. Available units are s, min, h, d. If this parameter is set, the attribute **unit_of_measurement** will be set like x/y where x is the unit of the sensor given via the **source** parameter and y is the value given here.
  required: false
  default: h
  type: string
unit:
  description: Unit of Measurement to be used for the derivative. This will overwrite the automatically set **unit_of_measurement** as explained above.
  required: false
  type: string
time_window:
  description: The time window in which to calculate the derivative. Derivatives in this window will be averaged with a Simple Moving Average algorithm weighted by time. This is for instance useful for a sensor that outputs discrete values, or to filter out short duration noise. By default the derivative is calculated between two consecutive updates without any smoothing.
  default: 0
  required: false
  type: time
{% endconfiguration %}

## Temperature example

For example, you have a temperature sensor `sensor.temperature` that outputs a value every few seconds, but rounds to the nearest half number.
That means that two consecutive output values might be the same (so the derivative is `Δy/Δx=0` because `Δy=0` !)
However, the temperature might actually be changing over time.
In order to capture this, you should use a `time_window`, such that immediate jumps don't result in high derivatives and that after the next sensor update, the derivatives doesn't vanish to zero.
An example YAML configuration that uses `time_window` is

```yaml
sensor:
  - platform: derivative
    source: sensor.temperature
    name: Temperature change per hour
    round: 1
    unit_time: h # the resulting "unit_of_measurement" will be °C/h if the sensor.temperate has set °C as its unit
    time_window: "00:30:00"  # we look at the change over the last half hour
```
