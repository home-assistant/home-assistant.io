---
title: Integration - Riemann sum integral
description: Instructions on how to integrate Integration Sensor into Home Assistant.
ha_category:
  - Utility
  - Energy
  - Sensor
ha_release: 0.87
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@dgomes'
ha_domain: integration
ha_platforms:
  - sensor
---

The `integration` platform provides the [Riemann sum](https://en.wikipedia.org/wiki/Riemann_sum) of the values provided by a source sensor. The Riemann sum is an approximation of an **integral** by a finite sum. The integration sensors is updated upon changes of the **source**. Fast sampling source sensors provide better results. In this implementation, the default is the more accurate trapezoidal method, but the left and right methods can optionally be used.

Simply put, integration takes samples of the rate of change of a value (for example, power consumption at different points in time) and integrates them into the total value, typically after some amount of time (for power consumption as the input, it yields the total power consumed). Below is an example of how you can use this sensor to calculate the total power you consumed using a current power consumption reading from, say, a smart power outlet.

## Configuration

To enable the Riemann sum sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: integration
    source: sensor.current_power
```

{% configuration %}
source:
  description: The entity ID of the sensor providing numeric readings.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: source entity ID meter
  type: string
round:
  description: Round the calculated integration value to at most N decimal places.
  required: false
  default: 3
  type: integer
unit_prefix:
  description: "Metric unit to prefix the integration result. Available units are `k`, `M`, `G` and `T`."
  required: false
  default: None
  type: string
unit_time:
  description: "SI unit of time to integrate over. Available units are `s`, `min`, `h` and `d`."
  required: false
  default: h
  type: string
method:
  description: "Riemann sum method to be used. Available methods are `trapezoidal`, `left` and `right`."
  required: false
  type: string
  default: trapezoidal
max_timeslice:
  description: "The expected update frequency of the sensor, used to improve precision with the right and trapezoidal integration methods when used with spiky loads."
  required: false
  type: time
  default: None
{% endconfiguration %}

It's recommended to also specify the `max_timeslice` parameter, especially if you're integrating input from a sensor which produces spiky values after long periods of not producing any updates. One such example would be a smart outlet which measures the power consumption of **a boiler or a kettle.** If not specified, the right and trapezoidal integration methods will produce a gross overestimation of the total consumed power if the power sensor reports the same value (most typically 0 watts) for a very long duration. Alternatively, you can just use the less accurate left integration method instead of the trapezoidal method, but that will produce a slight overestimation (which may accumulate over time into a rather large overshoot).

The value for `max_timeslice` should be the typical update interval for the sensor. You can look at the History tab in the UI to see how often the value is updated. For smart outlet power sensors, you can use highly dynamic loads, such as computers, to benchmark the update frequency. Then, once you've measured how often it updates with a frequently updating load, you can specify that as the `max_timeslice`, plug in your boiler or kettle, and use the more precise trapezoidal integrator without compromise.

The unit of `source` together with `unit_prefix` and `unit_time` is used to generate a unit for the integral product (e.g. a source in `W` with prefix `k` and time `h` would result in `kWh`). Note that `unit_prefix` and `unit_time` are _also_ relevant to the Riemann sum calculation.

## Energy

An `integration` sensor is quite useful in energy billing scenarios since energy is generally billed in kWh (kilowatt-hours) and many sensors provide power in W (watts).

If you have a sensor that provides you with power readings in watts (uses W as `unit_of_measurement`), then you can use the `integration` sensor to track how much energy is being spent. Take the next configuration as an example:

```yaml
sensor:
  - platform: integration
    source: sensor.current_power
    name: energy_spent
    unit_prefix: k
    round: 2
```

This configuration will provide you with `sensor.energy_spent` which will have your energy in kWh.
