---
title: Attribute Sensor
description: Instructions on how to integrate attribute sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: 2023.3.0
ha_quality_scale: internal
ha_codeowners:
  - '@albinmedoc'
ha_domain: attribute_sensor
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The Attribute Sensor integration consumes a attribute value from another entity to determine it's own state.

If the source entity provides an unknown state, it will be reflected on this sensor.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Source entity:
  description: The entity to get the attribute from
Attribute:
  description: The name of the attribute that holds the value of this sensor
Device class:
  description: The device class of this sensor
Unit of measurement:
  description: The unit of measurement of this sensor
{% endconfiguration_basic %}

## YAML Configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. To enable the Attribute Sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: attribute_sensor
    source: person.john
    attribute: gps_accuracy
```

{% configuration %}
source:
  description: The entity to get the attribute from
  required: true
  type: string
attribute:
  description: The name of the attribute that holds the value of this sensor
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  type: string
device_class:
  description: The device class of this sensor
  required: false
  type: string
unit_of_measurement:
  description: The unit of measurement of this sensor
  required: false
  type: integer
unique_id:
  description: Unique id to be able to configure the entity in the UI.
  required: false
  type: string
{% endconfiguration %}
