---
title: Attribute as Sensor
description: Instructions on how to integrate Attribute as Sensor into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 2022.11
ha_quality_scale: internal
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: attribute_as_sensor
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The Attribute as Sensor integration consumes the attribute with state from another sensor to provide a new sensor.

If the source sensor provides an unknown or unavailable state, this sensor will provide an unknown state.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input entity:
  description: The entity to monitor
Attribute:
  description: Which attribute of the source entity to retrieve the value from.
Icon:
  description: Set a custom icon for the new sensor.
Device Class:
  description: Choose device class for the new sensor
State Class:
  description: Choose state class for the new sensor.
Unit of Measurement:
  description: Choose Celsius, Fahrenheit or provide your own custom unit of measurement.
{% endconfiguration_basic %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: min_max
    entity_id: sensor.kitchen_temperature
    attribute: humidity
```

{% configuration %}
entity_id:
  description: Source sensor to use.
  required: true
  type: string
attribute:
  description: The attribute you want to get as a new sensor.
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: true
  type: string
unique_id:
  description: Provide unique id to get ability to customize sensor in frontend.
  required: false
  type: string
icon:
  description: Icon to use in frontend.
  required: false
  type: icon
device_class:
  description: Sensor device class from available sensor devices classes.
  required: false
  type: string
state_class:
  description: Sensor state class from available sensor state classes.
  required: false
  type: string
unit_of_measurement:
  description: Unit of Measurement to apply to the new sensor.
  required: false
  type: string
{% endconfiguration %}

Available device classes to use for the sensor can be seen [here](https://www.home-assistant.io/integrations/sensor#device-class)

State class can be any of `measurement`, `total` or `total_increasing`.
