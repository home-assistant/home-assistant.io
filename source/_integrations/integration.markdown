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

The `integration` platform provides the [Riemann sum](https://en.wikipedia.org/wiki/Riemann_sum) of the values provided by a source sensor. The Riemann sum is an approximation of an **integral** by a finite sum. The integration sensors is updated upon changes of the **source**. Fast sampling source sensors provide better results. In this implementation, the default is the Trapezoidal method, but Left and Right methods can optionally be used.

## Configuration

To enable Integration Sensor in your installation, add the following to your `configuration.yaml` file:

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
unit:
  description: Unit of measurement to be used for the integration.
  required: false
  type: string
method:
  description: "Riemann sum method to be used. Available methods are `trapezoidal`, `left` and `right`."
  required: false
  type: string
  default: trapezoidal
{% endconfiguration %}

In case you have an appliance which produces spikey consumption (like an on/off electrical boiler) you should opt for the `left` method to get accurate readings.

The unit of `source` together with `unit_prefix` and `unit_time` is used to generate a unit for the integral product (e.g. a source in `W` with prefix `k` and time `h` would result in `kWh`). You can override this behaviour by providing a custom value for `unit`. Note that `unit_prefix` and `unit_time` are _also_ relevant to the Riemann sum calculation. Even if you provide a custom value for `unit`, ensure prefix and time accurately reflect the properties of your source data.

## Energy

An `integration` sensor is quite useful in energy billing scenarios since energy is generally billed in kWh and many sensors provide power in W (Watts).

If you have a sensor that provides you with power readings in Watts (uses W as `unit_of_measurement`), then you can use the `integration` sensor to track how much energy is being spent. Take the next configuration as an example:

```yaml
sensor:
  - platform: integration
    source: sensor.current_power
    name: energy_spent
    unit_prefix: k
    round: 2
```

This configuration will provide you with `sensor.energy_spent` who will have your energy in kWh.
