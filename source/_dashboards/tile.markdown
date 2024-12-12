---
type: card
title: "Tile card"
sidebar_label: Tile
description: "The tile card gives you a quick overview of your entity. The card allows you to toggle the entity, show the more-info dialog, or custom actions."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs:  /dashboards/features/
    title: Card features
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The tile card gives you a quick overview of your {% term entity %}. The card allows you to toggle the {% term entity %} and show the more info dialog. A badge is shown for some {% term entities %} like the [climate](/integrations/climate) or [person](/integrations/person) {% term entities %}.

<p class='img'>
  <img src='/images/dashboards/tile_card.png' alt='Screenshot of tile cards'>
  Screenshot of tile cards.
</p>

{% include dashboard/edit_dashboard.md %}

{% configuration %}
type:
  required: true
  description: "`tile`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites the entity name.
  type: string
icon:
  required: false
  description: Overwrites the entity icon.
  type: string
color:
  required: false
  description: Set the color when the entity is active. By default, the color is based on `state`, `domain`, and `device_class` of your entity. It accepts [color token](/dashboards/tile/#available-colors) or hex color code.
  type: string
  default: state
show_entity_picture:
  required: false
  description: If your entity has a picture, it will replace the icon.
  type: boolean
  default: false
vertical:
  required: false
  description: Displays the icon above the name and state.
  type: boolean
  default: false
hide_state:
  required: false
  description: Hide the entity state.
  type: boolean
  default: false
state_content:
  required: false
  description: >
    Content to display for the state. Can be `state`, `last_changed`, `last_updated`, or any attribute of the entity. Can be either a string with a single item, or a list of string items. Default depends on the entity domain.
  type: [string, list]
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will show the "more-info" dialog.
  type: map
hold_action:
  required: false
  description: Action taken on tap-and-hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
icon_tap_action:
  required: false
  description: Action taken on icon card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will `toggle` the entity (if possible), otherwise, show the "more-info" dialog.
  type: map
icon_hold_action:
  required: false
  description: Action taken on icon tap-and-hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
icon_double_tap_action:
  required: false
  description: Action taken on icon double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
features:
  required: false
  description: Additional widgets to control your entity. See [available features](/dashboards/features).
  type: list
{% endconfiguration %}

## Examples

Alternatively, the card can be configured using YAML:

```yaml
type: tile
entity: cover.kitchen_window
```

```yaml
type: tile
entity: light.bedroom
icon: mdi:lamp
color: yellow
```

```yaml
type: tile
entity: person.anne_therese
show_entity_picture: true
```

```yaml
type: tile
entity: person.anne_therese
vertical: true
hide_state: true
```

```yaml
type: tile
entity: light.living_room
state_content: 
  - state
  - brightness
  - last-changed
```

```yaml
type: tile
entity: vacuum.ground_floor
features:
  - type: vacuum-commands
    commands:
      - start_pause
      - return_home
```

## Available colors

You want to colorize the tile card? Choose one of the following colors: `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black` and `white`.

## Reordering features

Some features of the tile card, such as the presets or the HVAC modes of a
thermostat, can show many buttons. While you can limit the buttons you’d
like to see, they may not be in the desired order.

For your thermostat, that means you can reorder the HVAC modes or presets.

<p class='img'>
    <img src="/images/blog/2024-05/tile-card-reorder-features.gif" alt=" Screen recording showing how you can now reorder the HVAC modes on the thermostat shown in a tile card."/>
    You can now reorder the features of the tile card.
</p>
