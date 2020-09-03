---
title: Emulated Kasa
description: Instructions on how to integrate Emulated Kasa within Home Assistant.
ha_category:
  - Hub
  - Energy
ha_iot_class: Local Push
ha_release: 0.112
ha_config_flow: false
ha_codeowners:
  - '@kbickar'
ha_domain: emulated_kasa
---

The Emulated Kasa integration emulates a TP-Link Kasa smart plug and announces the power usage of configured devices to any that might request it on the local network. 

For example, the [Sense Energy Monitor](/integrations/sense) can use this to idenfity power usage.

The configuration includes a list of entities to expose with attributes for the published name and current power usage.  The power usage can be a hard coded value, a sensor, or a template (see config example).

## Configuration

This integration requires the entities exposed to be listed in your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
emulated_kasa:
  entities:
    light.dining_room:
      name: "Dining Room Lights"
      power: 40.2
    fan.ceiling_fan:
      power: >-
                {% if is_state_attr('fan.ceiling_fan','speed', 'low') %} 2
                {% elif is_state_attr('fan.ceiling_fan','speed', 'medium') %} 12
                {% elif is_state_attr('fan.ceiling_fan','speed', 'high') %} 48
                {% endif %}
    light.wled:
      name: "Strip Lights"
      power: sensor.light_power_w
```

{% configuration %}
entities:
  description: A list of entities exposed
  required: true
  type: list
name:
  description: Name visible to external devices
  required: false
  type: string
power:
  description: The current power usage in Watts.  This can be set to a static value, a sensor measuring the watts, or a template
  required: false
  type: integer/float/entity/template
{% endconfiguration %}
