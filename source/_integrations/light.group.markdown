---
title: "Light Group"
description: "Instructions for how to setup light groups within Home Assistant."
ha_category:
  - Light
ha_release: 0.65
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: group
---

The light group platform lets you combine multiple lights into one entity. All child lights of a light group can still be used as usual, but controlling the state of the grouped light will forward the command to each child light.

## Configuration

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: group
    name: Kitchen Lights
    entities:
      - light.kitchen_ceiling_lights
      - light.kitchen_under_cabinet_lights
      - light.kitchen_spot_lights
      - light.pendant_lights
```

{% configuration %}
entities:
  description: A list of entities to be included in the light group.
  required: true
  type: [string, list]
name:
  description: The name of the light group. Defaults to "Light Group".
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this light group. If two lights have the same unique ID, Home Assistant will raise an error.
  required: false
  type: string
all:
  description: Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<p class='img'>
<img src='/images/integrations/light/group.png'>
Example of the light group "Kitchen Lights".
</p>

The supported features of all lights will be added together. For example, if you have one RGB light in a group of otherwise brightness-only lights, the light group will be shown with a color picker.

## Script Example

Here's an example of a script using the above light group.

```yaml
script:
  turn_on_kitchen_lights:
    alias: "Kitchen lights on"
    sequence:
      service: light.turn_on
      target:
        entity_id: light.kitchen_lights
      data:
        brightness: 100
```

## Group behavior

Group behavior differs depending on if the `all` option is `false` (the default) or `true`.
If `all` is `false`(the default):
- Group state is `unavailable` if all group members are `unavailable`
- Otherwise, group state is `unknown` if all group members are `unknown`
- Otherwise, group state is `on` if at least one group member is `on`
- Otherwise, group state is `off`

If `all` is `true`:
- Group state is `unavailable` if all group members are `unavailable`
- Otherwise, group state is `unknown` if at least one group member is `unknown` or `unavailable`
- Otherwise, group state is `off` if at least one group member is `off`
- Otherwise, group state is `on`
