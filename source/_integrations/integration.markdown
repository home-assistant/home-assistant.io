---
title: Integration - Riemann sum integral
description: Instructions on how to integrate Integration Sensor into Home Assistant.
ha_category:
  - Energy
  - Helper
  - Sensor
  - Utility
ha_release: 0.87
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@dgomes'
ha_domain: integration
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

This integrations provides the [Riemann sum](https://en.wikipedia.org/wiki/Riemann_sum)
of the values provided by a source sensor. The Riemann sum is an approximation
of an **integral** by a finite sum.

The integration sensors are updated upon changes of the **source**. Fast
sampling source sensors provide more accurate results. In this implementation, the
default is the Trapezoidal method, but Left and Right methods can optionally
be used.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input sensor:
  description: The entity providing numeric readings to integrate.
Integral method:
  description: Riemann sum method to be used.
Precision:
  description: Round the calculated integration value to at most N decimal places.
Metric prefix:
  description: Metric unit to prefix the integration result.
Integration time:
  description: SI unit of time to integrate over.
{% endconfiguration_basic %}


## YAML Configuration

Alternatively, this integration can be configured and set up manually via YAML
as well. To enable the Integration sensor in your installation, add the
following to your `configuration.yaml` file:

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
  default: source entity ID integral
  type: string
unique_id:
   description: An ID that uniquely identifies the integration sensor. Set this to a unique value to allow customization through the UI.
   required: false
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
{% endconfiguration %}

In case you expect that your source sensor will provide several subsequent values that are equal, you should opt for the `left` method to get accurate readings.

The unit of `source` together with `unit_prefix` and `unit_time` is used to generate a unit for the integral product (e.g. a source in `W` with prefix `k` and time `h` would result in `kWh`). Note that `unit_prefix` and `unit_time` are _also_ relevant to the Riemann sum calculation. 

## Energy

An integration sensor is quite useful in energy billing scenarios since energy is generally billed in kWh and many sensors provide power in W (Watts).

If you have a sensor that provides you with power readings in Watts (uses W as `unit_of_measurement`, `device_class` of `power`), then you can use the `integration` sensor to track how much energy is being spent. Take the next manual YAML configuration as an example:

```yaml
sensor:
  - platform: integration
    source: sensor.current_power
    name: energy_spent
    unit_prefix: k
    round: 2
```

This configuration will provide you with `sensor.energy_spent` which will have your energy in kWh, as a `device_class` of `energy`.
