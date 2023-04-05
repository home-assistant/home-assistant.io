---
type: card
title: "Tile Card"
sidebar_label: Tile
description: "The tile card gives you a quick overview of your entity. The card allows you to toggle the entity, show the more-info dialog, or custom actions."
---

The tile card gives you a quick overview of your entity. The card allows you to toggle the entity and show the more info dialog. A badge is shown for some entities like the [climate](/integrations/climate) or [person](/integrations/person) entities.

<p class='img'>
  <img src='/images/dashboards/tile_card.png' alt='Screenshot of the tile card'>
  Screenshot of the Tile card.
</p>

To add the Tile card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Tile** from the card picker.

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
  description: Overwrites the name of entity.
  type: string
icon:
  required: false
  description: Overwrites the icon of entity.
  type: string
color:
  required: false
  description: Set the color when the entity is active. By default, the color is based on `state`, `domain`, and `device_class` of your entity. It accepts [color token](/dashboards/tile/#available-color-tokens) or hex color code.
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
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will show the "more-info" dialog.
  type: map
icon_tap_action:
  required: false
  description: Action taken on icon card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will `toggle` the entity (if possible), otherwise, show the "more-info" dialog.
  type: map
features:
  required: false
  description: Additional widgets to control your entity. See [available features](/dashboards/tile/#tile-features).
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

## Available color tokens

Some color tokens are available to colorize the tile card : `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black` and `white`.

## Tile features

Some entities have support for "features". These widgets add quick controls to the tile card.

### Alarm modes

Widget that display buttons to arm and disarm an [alarm](/integrations/alarm_control_panel).

<p class='img'>
  <img src='/images/dashboards/tile-features/alarm_modes.png' alt='Screenshot of the tile card with alarm modes feature'>
  Screenshot of the tile card with alarm modes feature
</p>

```yaml
features:
  - type: "alarm-modes"
    modes:
      - armed_home
      - armed_away
      - armed_night
      - armed_vacation
      - armed_custom_bypass
      - disarmed
```

{% configuration %}
type:
  required: true
  description: "`alarm-modes`"
  type: string
modes:
  required: true
  description: List of modes to show on the card. The list can contain `armed_home`, `armed_away`, `armed_night`, `armed_vacation`, `armed_custom_bypass` and `disarmed`.
  type: list
{% endconfiguration %}

### Cover open/close

Widget that display buttons to open, close or stop a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/tile-features/cover_open_close.png' alt='Screenshot of the tile card with open/close feature'>
  Screenshot of the tile card with cover open/close feature
</p>

```yaml
features:
  - type: "cover-open-close"
```

{% configuration %}
type:
  required: true
  description: "`cover-open-close`"
  type: string
{% endconfiguration %}

### Cover tilt

Widget that display buttons to open, close or stop a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/tile-features/cover_tilt.png' alt='Screenshot of the tile card with tilt feature'>
  Screenshot of the tile card with cover tilt feature
</p>

```yaml
features:
  - type: "cover-tilt"
```

{% configuration %}
type:
  required: true
  description: "`cover-tilt`"
  type: string
{% endconfiguration %}

### Fan speed

Widget that display speed controls for a [fan](/integrations/fan).

<p class='img'>
  <img src='/images/dashboards/tile-features/fan_speed.png' alt='Screenshot of the tile card with fan speed feature'>
  Screenshot of the tile card with fan speed feature
</p>

```yaml
features:
  - type: "fan-speed"
```

{% configuration %}
type:
  required: true
  description: "`fan-speed`"
  type: string
{% endconfiguration %}

### Light brightness

Widget that display a slider to select the brightness for a [light](/integrations/light).

<p class='img'>
  <img src='/images/dashboards/tile-features/light_brightness.png' alt='Screenshot of the tile card with light brightness feature'>
  Screenshot of the tile card with light brightness feature
</p>

```yaml
features:
  - type: "light-brightness"
```

{% configuration %}
type:
  required: true
  description: "`light-brightness`"
  type: string
{% endconfiguration %}

### Vacuum commands

Widget that display buttons to control a [vacuum](/integrations/vacuum).

<p class='img'>
  <img src='/images/dashboards/tile-features/vacuum_commands.png' alt='Screenshot of the tile card with vacuum commands feature'>
  Screenshot of the tile card with vacuum commands feature
</p>

```yaml
features:
  - type: "vacuum-commands"
    commands:
      - start_pause
      - stop
      - clean_spot
      - locate
      - return_home
```

{% configuration %}
type:
  required: true
  description: "`vacuum-commands`"
  type: string
commands:
  required: true
  description: List of commands to show on the card. The list can contain `start_pause`, `stop`, `clean_spot`, `locate` and `return_home`.
  type: list
{% endconfiguration %}