---
title: "Derivative Sensor"
description: "Instructions on how to integrate Derivative Sensor into Home Assistant."
ha_category:
  - Utility
  - Energy
ha_release: 0.105
ha_iot_class: Local Push
logo: derivative.png
ha_qa_scale: internal
---

The `derivative` platform provides the numerical derivative or numerical differentiation of the values provided by a source sensor. Derivative sensors are updated upon changes of the **source**. Fast sampling source sensors provide better results. 

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
  description: Metric unit to prefix the derivative result. Available units are k, M, G, T.
  required: false
  default: None
  type: string
unit_time:
  description: SI unit of time to integrate over. Available units are s, min, h, d.
  required: false
  default: h
  type: string
unit:
  description: Unit of Measurement to be used for the derivative.
  required: false
  type: string
{% endconfiguration %}

If 'unit' is set then 'unit_prefix' and 'unit_time' are ignored.
