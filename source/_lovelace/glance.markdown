---
title: "Glance Card"
sidebar_label: Glance
description: "The Glance card is useful to group multiple sensors in a compact overview."
---

The Glance card is useful to group multiple sensors in a compact overview. Keep in mind that this can be used together with [entity-filter](/lovelace/entity-filter/) cards to create dynamic cards.

<p class='img'>
<img src='/images/lovelace/lovelace_glance_card.png' alt='Screenshot of the glance card'>
Screenshot of the Glance card.
</p>

To add the Glance card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Glance** from the card picker.

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

## Options For Entities

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
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab.
  type: string
{% endconfiguration %}

## Examples

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
<img src='/images/lovelace/lovelace_glance_card.png' alt='Screenshot of the glance card with custom title'>
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
