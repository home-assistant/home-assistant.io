---
title: Emulated Kasa
description: Instructions on how to integrate Emulated Kasa within Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Push
ha_release: 0.115
ha_codeowners:
  - '@kbickar'
ha_domain: emulated_kasa
ha_quality_scale: internal
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The Emulated Kasa {% term integration %} emulates a TP-Link Kasa smart plug and announces the power usage of configured devices to any that might request it on the local network.

For example, the [Sense Energy Monitor](/integrations/sense) can use this to identify power usage.

The configuration includes a list of entities to expose with attributes for the published name and current power usage.
If the entity is a sensor, that value will be reported as the current power usage unless the power field is defined.
The power field can contain a hardcoded value, a sensor, or a template (see configuration example).

{% note %}
The provided power unit must be the current power usage in Watts. Values of `kW` can be converted, but the values of `kWh` cannot be used.
{% endnote %}

## Configuration

This {% term integration %} requires the entities exposed to be listed in your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
emulated_kasa:
  entities:
    light.dining_room:
      power: 40.2
```

{% configuration %}
entities:
  description: A list of entities exposed.
  required: true
  type: map
  keys:
    name:
      description: Name visible to external devices.
      required: false
      type: string
    power:
      description: The current power usage in watts. This can be set to a static value or a template.
      required: false
      type: [integer,float,template]
    power_entity:
      description: A sensor measuring the current power usage in watts.
      required: false
      type: string
{% endconfiguration %}

A full configuration sample looks like the one below.

{% raw %}

```yaml
# Example configuration.yaml entry
emulated_kasa:
  entities:
    # uses the sensor state value
    sensor.power_meter:
      name: "Power Meter"
    # uses static value
    light.dining_room:
      name: "Dining Room Lights"
      power: 40.2
    # uses template based on state of device
    fan.ceiling_fan:
      power: >-
                {% if is_state_attr('fan.ceiling_fan','speed', 'low') %} 2
                {% elif is_state_attr('fan.ceiling_fan','speed', 'medium') %} 12
                {% elif is_state_attr('fan.ceiling_fan','speed', 'high') %} 48
                {% endif %}
    # uses value from 3rd party sensor
    light.wled:
      name: "Strip Lights"
      power_entity: sensor.light_power_w
    # uses template to convert device state into watts
    sensor.ups_kw:
      name: UPS Power
      power: "{{ float(states('sensor.ups_kw')) * 1000 }}"
```

{% endraw %}
