---
title: Conditional Card
sidebar_label: Conditional
description: The Conditional card displays another card based on entity states.
---

The Conditional card displays another card based on entity states.

To add the Conditional card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the plus button in the bottom right corner and select **Conditional** from the card picker. All options for this card can be configured via the user interface.

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
      description: Home Assistant entity ID.
      type: string
    operator:
      required: true
      description: Operator to use in the comparison. Can be `==`, `<=`, `<`, `>=`, `>`, `!=`, `in`, `not in`, or `regex`.
      type: string
    value:
      required: true
      description: Value which will be compared with the entity state.
      type: string
    attribute:
      required: false
      description: Attribute of the entity to use instead of the state.
      type: string
card:
  required: true
  description: Card to display if all conditions match.
  type: map
{% endconfiguration %}

Note: Conditions with more than one entity are treated as an 'and' condition. This means that for the card to show, *all* entities must meet the state requirements set.
Order is: result = entity.`state` `operator` `value`.

## Examples

```yaml
type: conditional
conditions:
  - entity: sensor.elektromer_l1
    operator: '<'
    value: 100
  - entity: light.bed_light
    operator: '=='
    value: "on"
  - entity: switch.decorative_lights
    operator: '!='
    value: "off"
card:
  type: entities
  entities:
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
```


### Deprecated configuration

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
      description: HA entity ID.
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
