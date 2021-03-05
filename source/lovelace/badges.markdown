---
title: "Lovelace Badges"
description: "Description of the various badges that are available."
---

Badges are widgets that sit at the top of a Lovelace panel, above all the cards.

## State Label Badge

The State Label badge allows you to display a state badge. This badge supports [actions](/lovelace/actions/).

```yaml
type: state-label
entity: light.living_room
```

{% configuration state_label %}
type:
  required: true
  description: "`state-label`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of entity
icon:
  required: false
  description: :"Overwrites icon or entity picture. You can use any icon from [MaterialDesignIcons.com](http://MaterialDesignIcons.com). Prefix the icon name with `mdi:`, ie `mdi:home`."
  type: string
  default: Entity domain icon
image:
  required: false
  description: The URL of an image.
  type: string
show_name:
  required: false
  description: Show name.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: Show icon.
  type: boolean
  default: "true"
{% endconfiguration %}

## Entity Filter Badge

This badge allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home.

{% configuration filter_badge %}
type:
  required: true
  description: "`entity-filter`"
  type: string
entities:
  required: true
  description: A list of entity IDs or `entity` objects, see below.
  type: list
state_filter:
  required: true
  description: List of strings representing states or `filter` objects, see below.
  type: list
{% endconfiguration %}

### Options For Entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configurations:

{% configuration entities %}
type:
  required: false
  description: "Sets a custom badge type: `custom:my-custom-badge`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture. You can use any icon from [MaterialDesignIcons.com](http://MaterialDesignIcons.com). Prefix the icon name with `mdi:`, ie `mdi:home`.
  type: string
image:
  required: false
  description: The URL of an image.
  type: string
state_filter:
  required: false
  description: List of strings representing states or `filter` objects, see below.
  type: list
{% endconfiguration %}

### Options For state_filter

If you define state_filter as objects instead of strings (by adding `value:` before your state value), you can add more customization to your filter:

{% configuration state_filter %}
value:
  required: true
  description: String representing the state.
  type: string
operator:
  required: false
  description: Operator to use in the comparison. Can be `==`, `<=`, `<`, `>=`, `>`, `!=` or `regex`.
  type: string
attribute:
  required: false
  description: Attribute of the entity to use instead of the state.
  type: string
{% endconfiguration %}

### Examples

Show only active switches or lights in the house

```yaml
type: entity-filter
entities:
  - entity: light.bed_light
    name: Bed
  - light.kitchen_lights
  - light.ceiling_lights
state_filter:
  - "on"
```

Specify filter for a single entity

```yaml
type: entity-filter
state_filter:
  - "on"
  - operator: ">"
    value: 90
entities:
  - sensor.water_leak
  - sensor.outside_temp
  - entity: sensor.humidity_and_temp
    state_filter:
      - operator: ">"
        value: 50
        attribute: humidity
```
