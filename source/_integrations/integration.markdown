---
title: Integral
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

This integration provides the [Riemann sum](https://en.wikipedia.org/wiki/Riemann_sum)
of the values provided by a source sensor. The Riemann sum is an approximation
of an **integral** by a finite sum.

The integration sensors are updated whenever the source changes and, optionally, based on a predefined
time interval. Source sensors with higher sampling frequency provide more accurate results.

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
Max sub-interval:
  description: Applies time-based integration if the source did not change for this duration. This implies that at least every `max sub-interval`, the integral is updated. If you don't want time-based updates, enter `0`.
{% endconfiguration_basic %}


## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
as well. To enable the Integration sensor in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

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
max_sub_interval:
  description: "Applies time-based integration if the source did not change for this duration. This implies that at least every `max sub-interval`, the integral is updated. If you don't want time-based updates, enter 0."
  required: false
  type: time
  default: 0
{% endconfiguration %}

The unit of `source` together with `unit_prefix` and `unit_time` is used to generate a unit for the integral product (e.g. a source in `W` with prefix `k` and time `h` would result in `kWh`). Note that `unit_prefix` and `unit_time` are _also_ relevant to the Riemann sum calculation. 

## Integration method

The Riemann Sum is an approximation of an integral by a finite sum and is therefore intrinsically inaccurate. Nonetheless, depending on the method used, values can be more or less accurate.

The integration method defines how to calculate the area under the source sensor when it changes. Regardless of the method used, the integration will be more accurate if the source updates more often. The config `max_sub_interval` can be used to trigger integration when the source sensor is constant.

### Trapezoidal

The `trapezoidal` method follows the [Trapezoidal rule](https://en.wikipedia.org/wiki/Trapezoidal_rule). This method is the most accurate of the currently implemented methods, **if** the source updates often, since it better fits the curve of the intrinsic source. 

### Left

The `left` method follows the [Left rule](https://en.wikipedia.org/wiki/Riemann_sum#Left_rule). The method **underestimates** the intrinsic source, but is extremely accurate at estimating rectangular functions which are very stable for long periods of time and change very rapidly (e.g. such as the power function of a resistive load can jump instantly to a given value and stay at the same value for hours). If your source keeps its state for long periods of time, this method is preferable to the `trapezoidal`.

### Right

The `right` method follows the [Right rule](https://en.wikipedia.org/wiki/Riemann_sum#Right_rule). The method is similar to the left method, but **overestimates** the intrinsic source. Again it is only appropriate to be used with rectangular functions.

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
    max_sub_interval:
      minutes: 5
```

This configuration will provide you with `sensor.energy_spent` which will have your energy in kWh, as a `device_class` of `energy`.
