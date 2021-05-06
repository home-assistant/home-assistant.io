---
title: Derivative
description: Instructions on how to integrate Derivative Sensor into Home Assistant.
ha_category:
  - Utility
  - Energy
  - Sensor
ha_release: 0.105
ha_iot_class: Calculated
logo: derivative.png
ha_qa_scale: internal
ha_codeowners:
  - '@afaucogney'
ha_domain: derivative
ha_platforms:
  - sensor
---

The `derivative` platform creates a sensor that estimates the derivative of the values provided by a source sensor.
Derivative sensors are updated upon changes of the **source**.

## Configuration

To enable Derivative Sensor in your installation, add the following to your `configuration.yaml` file:

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
  default: source entity ID meter
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
  description: The time window in which to calculate the derivative. This is useful for sensor that output discrete values. By default the derivative is calculated between two consecutive updates.
  default: 0
  required: false
  type: time
{% endconfiguration %}

## Temperature example

For example, you have a temperature sensor `sensor.temperature` that outputs a value every few seconds, but rounds to the nearest half number.
That means that two consecutive output values might be the same (so the derivative is `Δy/Δx=0` because `Δy=0` !)
However, the temperature might actually be changing over time.
In order to capture this, you should use a `time_window`, such that immediate jumps don't result in high derivatives and that after the next sensor update, the derivatives doesn't vanish to zero.
An example configuration that uses `time_window` is

```yaml
sensor:
  - platform: derivative
    source: sensor.temperature
    name: Temperature change per hour
    round: 1
    unit_time: h # the resulting "unit_of_measurement" will be °C/h if the sensor.temperate has set °C as it's unit
    time_window: "00:30:00"  # we look at the change over the last half hour
```
