---
type: card
title: "Tile card"
sidebar_label: Tile
description: "The tile card gives you a quick overview of an entity. The card allows you to toggle the entity, show the more-info dialog, or custom actions."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /dashboards/naming/
    title: Card naming
  - docs:  /dashboards/features/
    title: Card features
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The tile card gives you a quick overview of an {% term entity %}. The card allows you to add tap actions, and features to control the entity. You can also select the {% term entity %} to open the **More info** dialog. A badge is shown for some {% term entities %} like the [climate](/integrations/climate) or [person](/integrations/person) {% term entities %}.

<p class='img'>
  <img src='/images/dashboards/tile_card_tap_action.webp' alt='Screenshot of tile cards'>
  The circular background behind an icon indicates that there is a tap action.
  The "Downstairs" and "Upstairs" climate entities have a badge and a feature that is bottom-aligned.
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
  description: Overwrites friendly name. Can be a string, or a name configuration object. See [naming documentation](/dashboards/naming/).
  type: [string, map, list]
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
features_position:
  required: false
  description: Position of the features on the tile card. Can be `bottom` or `inline`. Only the first feature will be displayed when the option is set to `inline`. `inline` is not compatible with the `vertical` option.
  type: string
  default: bottom

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

The following colors are available to colorize the tile card: `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`, or any hex color code (for example, `#93c47d`).

## Theme Variables

The tile card supports theme variables to customize the appearance of the primary and secondary text. These variables can be set in your theme configuration.

### Available Variables

**Primary Text:**

- `ha-tile-info-primary-font-size` - Font size of the primary text (default: `var(--ha-font-size-m)`)
- `ha-tile-info-primary-font-weight` - Font weight of the primary text (default: `var(--ha-font-weight-medium)`)
- `ha-tile-info-primary-line-height` - Line height of the primary text (default: `var(--ha-line-height-normal)`)
- `ha-tile-info-primary-letter-spacing` - Letter spacing of the primary text (default: `0.1px`)
- `ha-tile-info-primary-color` - Color of the primary text (default: `var(--primary-text-color)`)

**Secondary Text:**

- `ha-tile-info-secondary-font-size` - Font size of the secondary text (default: `var(--ha-font-size-s)`)
- `ha-tile-info-secondary-font-weight` - Font weight of the secondary text (default: `var(--ha-font-weight-normal)`)
- `ha-tile-info-secondary-line-height` - Line height of the secondary text (default: `var(--ha-line-height-condensed)`)
- `ha-tile-info-secondary-letter-spacing` - Letter spacing of the secondary text (default: `0.4px`)
- `ha-tile-info-secondary-color` - Color of the secondary text (default: `var(--primary-text-color)`)

### Example Theme Configuration

This theme example changes the appearance of the tile card so that it is suitable for viewing at a distance from a wall panel.

```yaml
Panel:
  # Primary text styling
  ha-tile-info-primary-font-size: 1rem
  ha-tile-info-primary-font-weight: 500
  ha-tile-info-primary-color: steelblue
  # Secondary text styling
  ha-tile-info-secondary-font-size: 0.875rem
  ha-tile-info-secondary-font-weight: 400
  ha-tile-info-secondary-color: gray
  modes:
    dark:
      ha-tile-info-secondary-color: lightgray
