---
layout: page
title: "Integration Sensor"
description: "Instructions on how to integrate Integration Sensor into Home Assistant."
date: 2019-01-02
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Utility 
ha_release: 0.87
ha_iot_class: "Local Push"
logo: integral.png
ha_qa_scale: internal
---

The `integration` platform provides the [Riemann sum](https://en.wikipedia.org/wiki/Riemann_sum) of the values provided by a source sensor. The Riemann sum is an approximation of an **integral** by a finite sum. In this implementation, we follow the Trapezoidal rule.

## {% linkable_title Configuration %}

To enable Integration Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: integration 
    source: sensor.current_power
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
  description: Round the calculated integration value to at most N decimal places.
  required: false
  default: 3
  type: integer
unit_prefix:
  description: Metric unit to prefix the integration result. Available units are k, M, G, T.
  required: false
  default: None
  type: unit
unit_time:
  description: SI unit of time to integrate over. Available units are s, min, h, d.
  required: false
  default: h
  type: unit
unit:
  description: Unit of Measurement to be used for the integration.
  required: false
  type: string
{% endconfiguration %}

If 'unit' is set then 'unit_prefix' and 'unit_time' are ignored.

## {% linkable_title Energy %}

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
