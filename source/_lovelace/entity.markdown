---
title: "Entity Card"
sidebar_label: Entity
description: "The Entity card gives you a quick overview of your entity's state"
---

The Entity card gives you a quick overview of your entity's state.

<p class='img'>
  <img src='/images/lovelace/lovelace_entity_card.png' alt='Screenshot of the entity card'>
  Screenshot of the entity card.
</p>

{% configuration %}
type:
  required: true
  description: entity
  type: string
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Name of Entity
  type: string
  default: Entity Name
icon:
  required: false
  description: Overwrites icon.
  type: string
attribute:
  required: false
  description: An attribute associated with the `entity`
  type: string
unit:
  required: false
  description: Unit of Measurement given to data
  type: string
  default: "Unit Of Measurement given by entity"
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/lovelace/header-footer/).
  type: map
{% endconfiguration %}

## Example

```yaml
- type: entity
  entity: cover.kitchen_window
- type: entity
  entity: light.bedroom
  attribute: brightness
  unit: '%'
- type: entity
  entity: vacuum.downstairs
  name: Vacuum
  icon: 'mdi:battery'
  attribute: battery_level
  unit: '%'
```