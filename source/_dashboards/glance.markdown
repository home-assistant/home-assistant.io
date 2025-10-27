---
type: card
title: "Glance card"
sidebar_label: Glance
description: "The glance card is useful to group multiple sensors in a compact overview."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The glance card is useful to group multiple sensors in a compact overview. Keep in mind that this can be used together with [entity-filter](/dashboards/entity-filter/) cards to create dynamic cards.

<p class='img'>
<img src='/images/dashboards/glance_card.png' alt='Screenshot of the glance card'>
Screenshot of the glance card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`glance`"
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
  type: list
title:
  required: false
  description: Card title.
  type: string
show_name:
  required: false
  description: Show entity name.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: Show entity icon.
  type: boolean
  default: "true"
show_state:
  required: false
  description: Show entity state text.
  type: boolean
  default: "true"
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
columns:
  required: false
  description: Number of columns to show. If not specified the number will be set automatically.
  type: integer
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active.
  type: boolean
  default: true
{% endconfiguration %}

### Options for entities

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
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
  description: Overwrites icon.
  type: string
image:
  required: false
  description: Overwrites entity picture.
  type: string
show_last_changed:
  required: false
  description: Overwrites the state display with the relative time since last changed.
  type: boolean
  default: false
show_state:
  required: false
  description: Show entity state text.
  type: boolean
  default: true
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/dashboards/actions/).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: glance
title: Glance card sample
entities:
  - binary_sensor.movement_backyard
  - light.bed_light
  - binary_sensor.basement_floor_wet
  - sensor.outside_temperature
  - light.ceiling_lights
  - switch.ac
  - lock.kitchen_door
```

<p class='img'>
<img src='/images/dashboards/glance_card.png' alt='Screenshot of the glance card with custom title'>
Screenshot of the glance card with custom title.
</p>

Define entities as objects and apply a custom name:

```yaml
type: glance
title: Better names
entities:
  - entity: binary_sensor.movement_backyard
    name: Movement?
  - light.bed_light
  - binary_sensor.basement_floor_wet
  - sensor.outside_temperature
  - light.ceiling_lights
  - switch.ac
  - lock.kitchen_door
  - entity: switch.wall_plug_switch
    tap_action:
      action: toggle
```
