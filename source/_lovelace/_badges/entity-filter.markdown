---
title: "Entity Filter Badge"
sidebar_label: Entity Filter
description: "This badge allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home. "
---

This badge allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home.

{% configuration %}
type:
  required: true
  description: entity-filter
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

## Options For Entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configurations:

{% configuration %}
type:
  required: false
  description: "Sets a custom badge type: `custom:my-custom-badge`"
  type: string
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
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

## Options For state_filter

If you define state_filter as objects instead of strings (by adding `value:` before your state value), you can add more customization to your filter:

{% configuration %}
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
