---
type: card
title: "Entity card"
sidebar_label: Entity
description: "The entity card gives you a quick overview of your entity's state"
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/header-footer/
    title: Card header and footer
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The entity card gives you a quick overview of your entity's state.

<p class='img'>
  <img src='/images/dashboards/entity_card.png' alt='Screenshot of the entity card'>
  Screenshot of the Entity card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`entity`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Name of entity.
  type: string
  default: Entity name.
icon:
  required: false
  description: Overwrites icon.
  type: string
state_color:
  required: false
  description: Set to `true` to have icon colored when entity is active.
  type: boolean
  default: false  
attribute:
  required: false
  description: An attribute associated with the `entity`.
  type: string
unit:
  required: false
  description: Unit of measurement given to data.
  type: string
  default: Unit of measurement given by entity.
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/dashboards/header-footer/).
  type: map
{% endconfiguration %}

### Example

```yaml
- type: entity
  entity: cover.kitchen_window
- type: entity
  entity: light.bedroom
  attribute: brightness
  unit: "%"
- type: entity
  entity: vacuum.downstairs
  name: Vacuum
  icon: "mdi:battery"
  attribute: battery_level
  unit: "%"
```
