---
type: card
title: Conditional Card
sidebar_label: Conditional
description: The Conditional card displays another card based on entity states.
---

The Conditional card displays another card based on entity states.

To add the Conditional card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Conditional** from the card picker. All options for this card can be configured via the user interface.

{% configuration %}
type:
  required: true
  description: conditional
  type: string
conditions:
  required: true
  description: List of entity IDs and matching states.
  type: list
  keys:
    entity:
      required: true
      description: Entity ID.
      type: string
    state:
      required: false
      description: Entity state is equal to this value.*
      type: string
    state_not:
      required: false
      description: Entity state is unequal to this value.*
      type: string
    state_filter:
      required: false
      description: List of strings representing states or `filter` objects, see below.
      type: list
card:
  required: true
  description: Card to display if all conditions match.
  type: map
{% endconfiguration %}

*one is required (`state`, `state_not` or `state_filter`)

Note: Conditions with more than one entity are treated as an 'and' condition. This means that for the card to show, *all* entities must meet the state requirements set.

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

## Examples

```yaml
type: conditional
conditions:
  - entity: light.bed_light
    state: "on"
  - entity: switch.decorative_lights
    state_not: "off"
card:
  type: entities
  entities:
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
```
