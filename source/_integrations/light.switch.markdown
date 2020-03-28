---
title: "Light Switch"
description: "Instructions on how to set up a light switch within Home Assistant."
ha_category:
  - Light
ha_release: 0.83
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: light
---

The light switch platform lets you control an existing switch, allowing you
to use a switch like a light in Home Assistant.

In Home Assistant's world, a wall plug is a switch. This platform allows you
to expose this switch as a light source, allowing you to add, e.g., the wall
plug controlling your Christmas Tree, to be part of a light group.

To enable this platform in your installation, add the following to your
`configuration.yaml` file:

```yaml
light:
  - platform: switch
    name: Christmas Tree Lights
    entity_id: switch.christmas_tree_lights
```

{% configuration %}
  name:
    description: The name of the light switch.
    required: false
    type: string
    default: Light Switch
  entity_id:
    description: "The `entity_id` of a switch entity to control as a light source."
    required: true
    type: string
{% endconfiguration %}

A light switch only supports turning on/off a light.
