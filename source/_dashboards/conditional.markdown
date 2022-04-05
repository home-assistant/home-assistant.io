---
type: card
title: Conditional Card
sidebar_label: Conditional
description: The Conditional card displays another card based on entity states.
---

The Conditional card displays another card based on entity states.

To add the Conditional card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Conditional** from the card picker. All options for this card can be configured via the user interface.

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
card:
  required: true
  description: Card to display if all conditions match.
  type: map
{% endconfiguration %}

*one is required (`state` or `state_not`)

Note: Conditions with more than one entity are treated as an 'and' condition. This means that for the card to show, *all* entities must meet the state requirements set.

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
