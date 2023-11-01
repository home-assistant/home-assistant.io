---
type: card
title: "Tile Card"
sidebar_label: Tile
description: "The tile card gives you a quick overview of your entity. The card allows you to toggle the entity, show the more-info dialog, or custom actions."
---

The tile card gives you a quick overview of your entity. The card allows you to toggle the entity and show the more info dialog. A badge is shown for some entities like the [climate](/integrations/climate) or [person](/integrations/person) entities.

<p class='img'>
  <img src='/images/dashboards/tile_card.png' alt='Screenshot of tile cards'>
  Screenshot of Tile cards.
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
  description: Overwrites the entity name.
  type: string
icon:
  required: false
  description: Overwrites the entity icon.
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
hide_state:
  required: false
  description: Hide the entity state.
  type: boolean
  default: false
state_content:
  required: false
  description: >
    Content to display for the state. Can be `state`, `last-changed`, or any attribute of the entity. Can be either a string with a single item, or a list of string items. Default depends on the entity domain.
  type: [string, list]
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

### Climate HVAC modes

Widget that displays buttons to control the HVAC mode for a [climate](/integrations/climate).

<p class='img'>
  <img src='/images/dashboards/tile-features/climate_hvac_modes.png' alt='Screenshot of the tile card with the climate HVAC modes feature'>
  Screenshot of the tile card with the climate HVAC modes feature
</p>

```yaml
features:
  - type: "climate-hvac-modes"
    hvac_modes:
      - auto
      - heat_cool
      - heat
      - cool
      - dry
      - fan_only
      - "off"
```

{% configuration %}
type:
  required: true
  description: "`climate-hvac-modes`"
  type: string
hvac_modes:
  required: true
  description: List of modes to show on the card. The list can contain `auto`, `heat_cool`, `heat`, `cool`, `dry`, `fan_only` and `off`.
  type: list
{% endconfiguration %}

### Climate preset modes

Widget that displays buttons or a dropdown to control the preset mode for a [climate](/integrations/climate).

```yaml
features:
  - type: "climate-preset-modes"
    style: icons
    preset_modes:
      - none
      - eco
```

{% configuration %}
type:
  required: true
  description: "`climate-preset-modes`"
  type: string
style:
  required: false
  description: "`icons` or `dropdown`"
  type: string
  default: dropdown
preset_modes:
  required: true
  description: List of modes to show on the card. The list can contain `none`, `eco`, and more (depending on your provider).
  type: list
{% endconfiguration %}

### Cover open/close

Widget that displays buttons to open, close, or stop a [cover](/integrations/cover).

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

### Cover position

Widget that displays a slider to control the position for a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/tile-features/cover_position.png' alt='Screenshot of the tile card with the cover position feature'>
  Screenshot of the tile card with the cover position feature
</p>

```yaml
features:
  - type: "cover-position"
```

{% configuration %}
type:
  required: true
  description: "`cover-position`"
  type: string
{% endconfiguration %}

### Cover tilt

Widget that displays buttons to open, close, or stop a [cover](/integrations/cover).

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

### Cover tilt position

Widget that displays a slider to control the tilt position for a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/tile-features/cover_tilt_position.png' alt='Screenshot of the tile card with the cover tilt position feature'>
  Screenshot of the tile card with the cover tilt position feature
</p>

```yaml
features:
  - type: "cover-tilt-position"
```

{% configuration %}
type:
  required: true
  description: "`cover-tilt-position`"
  type: string
{% endconfiguration %}

### Fan speed

Widget that displays speed controls for a [fan](/integrations/fan).

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

### Lawn mower commands

Widget that displays buttons to control a [lawn mower](/integrations/lawn_mower).

<p class='img'>
  <img src='/images/dashboards/tile-features/lawn_mower_commands.png' alt='Screenshot of the tile card with the lawn mower commands feature'>
  Screenshot of the tile card with the lawn mower commands feature
</p>

```yaml
features:
  - type: "lawn-mower-commands"
    commands:
      - start_pause
      - dock
```

{% configuration %}
type:
  required: true
  description: "`lawn-mower-commands`"
  type: string
commands:
  required: true
  description: List of commands to show on the card. The list can contain `start_pause` and `dock`.
  type: list
{% endconfiguration %}

### Light brightness

Widget that displays a slider to select the brightness for a [light](/integrations/light).

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

### Light color temp

Widget that displays a slider to select the color temperature for a [light](/integrations/light).

<p class='img'>
  <img src='/images/dashboards/tile-features/light_color_temp.png' alt='Screenshot of the tile card with the light color temperature feature'>
  Screenshot of the tile card with the light color temperature feature
</p>

```yaml
features:
  - type: "light-color-temp"
```

{% configuration %}
type:
  required: true
  description: "`light-color-temp`"
  type: string
{% endconfiguration %}

### Target temperature

Widget that displays buttons to select the target temperature for a [climate](/integrations/climate) or a [water heater](/integrations/water_heater).

<p class='img'>
  <img src='/images/dashboards/tile-features/target_temperature.png' alt='Screenshot of the tile card with the target temperature feature'>
  Screenshot of the tile card with the target temperature feature
</p>

```yaml
features:
  - type: "target-temperature"
```

{% configuration %}
type:
  required: true
  description: "`target-temperature`"
  type: string
{% endconfiguration %}

### Vacuum commands

Widget that displays buttons to control a [vacuum](/integrations/vacuum).

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

### Water heater operation modes

Widget that displays buttons to control the operation mode of a [water heater](/integrations/water_heater).

<p class='img'>
  <img src='/images/dashboards/tile-features/water_heater_operation_modes.png' alt='Screenshot of the tile card with the water heater operation modes feature'>
  Screenshot of the tile card with the water heater operation modes feature
</p>

```yaml
features:
  - type: "water-heater-operation-modes"
    operation_modes:
      - electric
      - gas
      - heat_pump
      - eco
      - performance
      - high_demand
      - "off"
```

{% configuration %}
type:
  required: true
  description: "`water-heater-operation-modes`"
  type: string
operation_modes:
  required: true
  description: List of modes to show on the card. The list can contain `electric`, `gas`, `heat_pump`, `eco`, `performance`, `high_demand` and `off`.
  type: list
{% endconfiguration %}

### Button

A button to press a [button](/integrations/button) or run scripts or automations.

```yaml
features:
  - type: "button"
```

{% configuration %}
type:
  required: true
  description: "`button`"
  type: string
{% endconfiguration %}

### Toggle

A toggle to turn on and off a [switch](/integrations/switch) or a [light](/integrations/light) or an [automation](/integrations/automation).

```yaml
features:
  - type: "toggle"
```

{% configuration %}
type:
  required: true
  description: "`toggle`"
  type: string
{% endconfiguration %}

### Datetime Input

Show an input to edit the state of an [input_datetime](/integrations/input_datetime) entity.

```yaml
features:
  - type: "datetime"
```

{% configuration %}
type:
  required: true
  description: "`datetime`"
  type: string
{% endconfiguration %}

### Text Input

Show an input to edit the state of an [text](/integrations/text) entity.

```yaml
features:
  - type: "text"
```

{% configuration %}
type:
  required: true
  description: "`text`"
  type: string
{% endconfiguration %}

### Update

A widget that shows skip and install buttons for an [update](/integrations/update) entity.

```yaml
features:
  - type: "update"
```

{% configuration %}
type:
  required: true
  description: "`update`"
  type: string
{% endconfiguration %}

### Select options

A widget that shows a dropdown or buttons for a [select](/integrations/select) entity.

```yaml
features:
  - type: "select-options"
    style: dropdown
```

{% configuration %}
type:
  required: true
  description: "`select-options`"
  type: string
style:
  required: false
  description: "`buttons` or `dropdown`"
  type: string
  default: dropdown
{% endconfiguration %}

### Number Input

A widget that shows a slider or buttons for a [input_number](/integrations/input_number) entity.

```yaml
features:
  - type: "number"
    style: buttons
```

{% configuration %}
type:
  required: true
  description: "`number`"
  type: string
style:
  required: false
  description: "`slider` or `buttons`"
  type: string
  default: slider
{% endconfiguration %}

### Media Volume

A widget that shows a slider or buttons for a [media_player](/integrations/media_player) entity's volume.

```yaml
features:
  - type: "media-volume"
    style: buttons
```

{% configuration %}
type:
  required: true
  description: "`media-volume`"
  type: string
style:
  required: false
  description: "`slider` or `buttons`"
  type: string
  default: slider
{% endconfiguration %}

### Media Controls

A widget that shows buttons to control a [media_player](/integrations/media_player) entity.

```yaml
features:
  - type: "media-controls"
    use_extended_controls: true
```

{% configuration %}
type:
  required: true
  description: "`media-controls`"
  type: string
use_extended_controls:
  required: true
  description: "Whether to show extended controls"
  type: boolean
  default: false
{% endconfiguration %}

### Entity

A widget that shows/controls the state of another entity (useful for putting a ceiling fan control in your climate tile).

```yaml
features:
  - type: "entity"
```

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
hide_state:
  required: false
  description: Hide the entity state.
  type: boolean
  default: false
state_content:
  required: false
  description: >
    Content to display for the state. Can be `state`, `last-changed`, or any attribute of the entity. Can be either a string with a single item, or a list of string items. Default depends on the entity domain.
  type: [string, list]
icon_tap_action:
  required: false
  description: Action taken on icon card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will `toggle` the entity (if possible), otherwise, show the "more-info" dialog.
  type: map
{% endconfiguration %}
