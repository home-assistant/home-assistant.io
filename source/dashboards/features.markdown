---
title: "Features for dashboard cards"
description: "Decorate your dashboard cards with quick controls."
related:
  - docs: /dashboards/humidifier/
    title: Humidifier card
  - docs: /dashboards/thermostat/
    title: Thermostat card
  - docs: /dashboards/tile/
    title: Tile card
---

Some dashboard cards have support for features. These widgets add quick controls to the card. Supported features depend on the card and entity capabilities. Multiple features can be added to a single card.

<p class='img'><img src='/images/dashboards/features/screenshot-tile-feature-grid.png' alt="Screenshot of tile cards with features.">
Screenshot of tile cards with features.
</p>

Features can be enabled on the following cards:

- [Humidifier](/dashboards/humidifier/)
- [Thermostat](/dashboards/thermostat/)
- [Tile](/dashboards/tile/)

## Alarm modes

Widget that displays buttons to arm and disarm an [alarm](/integrations/alarm_control_panel).

<p class='img'>
  <img src='/images/dashboards/features/alarm_modes.png' alt='Screenshot of the tile card with alarm modes feature'>
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

{% configuration features %}
type:
  required: true
  description: "`alarm-modes`"
  type: string
modes:
  required: true
  description: List of modes to show on the card. The list can contain `armed_home`, `armed_away`, `armed_night`, `armed_vacation`, `armed_custom_bypass`, and `disarmed`.
  type: list
{% endconfiguration %}

## Climate fan modes

Widget that displays buttons or icons to control the fan mode for a [climate](/integrations/climate) device.

<p class='img'>
  <img src='/images/dashboards/features/climate_fan_modes.png' alt='Screenshot of the tile card with the climate fan modes feature'>
  Screenshot of the tile card with the climate fan modes feature
</p>

```yaml
features:
  - type: "climate-fan-modes"
    style: "icons"
    fan_modes:
      - "off"
      - low
      - medium
      - high
```

{% configuration features %}
type:
  required: true
  description: "`climate-fan-modes`"
  type: string
style:
  required: false
  description: "How the fan modes should be displayed. It can be either `dropdown` or `icons`."
  type: string
  default: dropdown
fan_modes:
  required: true
  description: List of fan modes to show on the card. The list can contain `on`, `off`, `auto`, `low`, `medium`, `high`, `middle`, `focus` and `diffuse` or any other custom fan mode.
  type: list
{% endconfiguration %}

## Climate HVAC modes

Widget that displays buttons to control the HVAC mode for a [climate](/integrations/climate).

<p class='img'>
  <img src='/images/dashboards/features/climate_hvac_modes.png' alt='Screenshot of the tile card with the climate HVAC modes feature'>
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

{% configuration features %}
type:
  required: true
  description: "`climate-hvac-modes`"
  type: string
style:
  required: false
  description: "How the modes should be displayed. It can be either `dropdown` or `icons`."
  type: string
  default: icons
hvac_modes:
  required: true
  description: List of modes to show on the card. The list can contain `auto`, `heat_cool`, `heat`, `cool`, `dry`, `fan_only`, and `off`.
  type: list
{% endconfiguration %}

## Climate preset modes

Widget that displays buttons or icons to control the preset mode for a [climate](/integrations/climate).

<p class='img'>
  <img src='/images/dashboards/features/climate_preset_modes.png' alt='Screenshot of the tile card with the climate preset modes feature'>
  Screenshot of the tile card with the climate preset modes feature
</p>

```yaml
features:
  - type: "climate-preset-modes"
    style: "icons"
    preset_modes:
      - home
      - eco
```

{% configuration features %}
type:
  required: true
  description: "`climate-preset-modes`"
  type: string
style:
  required: false
  description: "How the preset modes should be displayed. It can be either `dropdown` or `icons`."
  type: string
  default: dropdown
preset_modes:
  required: true
  description: List of preset modes to show on the card. The list can contain `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, and `activity` or any other custom preset mode.
  type: list
{% endconfiguration %}

## Cover open/close

Widget that displays buttons to open, close, or stop a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/features/cover_open_close.png' alt='Screenshot of the tile card with open/close feature'>
  Screenshot of the tile card with cover open/close feature
</p>

```yaml
features:
  - type: "cover-open-close"
```

{% configuration features %}
type:
  required: true
  description: "`cover-open-close`"
  type: string
{% endconfiguration %}

## Cover position

Widget that displays a slider to control the position for a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/features/cover_position.png' alt='Screenshot of the tile card with the cover position feature'>
  Screenshot of the tile card with the cover position feature
</p>

```yaml
features:
  - type: "cover-position"
```

{% configuration features %}
type:
  required: true
  description: "`cover-position`"
  type: string
{% endconfiguration %}

## Cover tilt

Widget that displays buttons to open, close, or stop a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/features/cover_tilt.png' alt='Screenshot of the tile card with tilt feature'>
  Screenshot of the tile card with cover tilt feature
</p>

```yaml
features:
  - type: "cover-tilt"
```

{% configuration features %}
type:
  required: true
  description: "`cover-tilt`"
  type: string
{% endconfiguration %}

## Cover tilt position

Widget that displays a slider to control the tilt position for a [cover](/integrations/cover).

<p class='img'>
  <img src='/images/dashboards/features/cover_tilt_position.png' alt='Screenshot of the tile card with the cover tilt position feature'>
  Screenshot of the tile card with the cover tilt position feature
</p>

```yaml
features:
  - type: "cover-tilt-position"
```

{% configuration features %}
type:
  required: true
  description: "`cover-tilt-position`"
  type: string
{% endconfiguration %}

## Fan preset modes

Widget that displays buttons or icons to control the preset mode for a [fan](/integrations/fan).

<p class='img'>
  <img src='/images/dashboards/features/fan_preset_modes.png' alt='Screenshot of the tile card with the fan preset modes feature'>
  Screenshot of the tile card with the fan preset modes feature
</p>

```yaml
features:
  - type: "fan-preset-modes"
    style: "icons"
    preset_modes:
      - auto
      - smart
      - sleep
      - 'on'
```

{% configuration features %}
type:
  required: true
  description: "`fan-preset-modes`"
  type: string
style:
  required: false
  description: "How the preset modes should be displayed. It can be either `dropdown` or `icons`."
  type: string
  default: dropdown
preset_modes:
  required: true
  description: List of preset modes to show on the card. The list can contain any supported preset modes.
  type: list
{% endconfiguration %}

## Fan speed

Widget that displays speed controls for a [fan](/integrations/fan).

<p class='img'>
  <img src='/images/dashboards/features/fan_speed.png' alt='Screenshot of the tile card with fan speed feature'>
  Screenshot of the tile card with fan speed feature
</p>

```yaml
features:
  - type: "fan-speed"
```

{% configuration features %}
type:
  required: true
  description: "`fan-speed`"
  type: string
{% endconfiguration %}

## Humidifier modes

Widget that displays buttons or icons to control the mode for a [humidifier](/integrations/humidifier).

<p class='img'>
  <img src='/images/dashboards/features/humidifier_modes.png' alt='Screenshot of the tile card with the humidifier modes feature'>
  Screenshot of the tile card with the humidifier modes feature
</p>

```yaml
features:
  - type: "humidifier-modes"
    style: "icons"
    modes:
      - home
      - eco
```

{% configuration features %}
type:
  required: true
  description: "`humidifier-modes`"
  type: string
style:
  required: false
  description: "How the modes should be displayed. It can be either `dropdown` or `icons`."
  type: string
  default: dropdown
modes:
  required: true
  description: List of modes to show on the card. The list can contain `normal`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, `auto`, and `baby` or any other custom mode.
  type: list
{% endconfiguration %}

## Humidifier toggle

Widget that displays buttons to turn on or off a [humidifier](/integrations/humidifier).

<p class='img'>
  <img src='/images/dashboards/features/humidifier_toggle.png' alt='Screenshot of the tile card with the humidifier toggle feature'>
  Screenshot of the tile card with the humidifier toggle feature
</p>

```yaml
features:
  - type: "humidifier-toggle"
```

{% configuration features %}
type:
  required: true
  description: "`humidifier-toggle`"
  type: string
{% endconfiguration %}

## Lawn mower commands

Widget that displays buttons to control a [lawn mower](/integrations/lawn_mower).

<p class='img'>
  <img src='/images/dashboards/features/lawn_mower_commands.png' alt='Screenshot of the tile card with the lawn mower commands feature'>
  Screenshot of the tile card with the lawn mower commands feature
</p>

```yaml
features:
  - type: "lawn-mower-commands"
    commands:
      - start_pause
      - dock
```

{% configuration features %}
type:
  required: true
  description: "`lawn-mower-commands`"
  type: string
commands:
  required: true
  description: List of commands to show on the card. The list can contain `start_pause` and `dock`.
  type: list
{% endconfiguration %}

## Light brightness

Widget that displays a slider to select the brightness for a [light](/integrations/light).

<p class='img'>
  <img src='/images/dashboards/features/light_brightness.png' alt='Screenshot of the tile card with light brightness feature'>
  Screenshot of the tile card with light brightness feature
</p>

```yaml
features:
  - type: "light-brightness"
```

{% configuration features %}
type:
  required: true
  description: "`light-brightness`"
  type: string
{% endconfiguration %}

## Light color temp

Widget that displays a slider to select the color temperature for a [light](/integrations/light).

<p class='img'>
  <img src='/images/dashboards/features/light_color_temp.png' alt='Screenshot of the tile card with the light color temperature feature'>
  Screenshot of the tile card with the light color temperature feature
</p>

```yaml
features:
  - type: "light-color-temp"
```

{% configuration features %}
type:
  required: true
  description: "`light-color-temp`"
  type: string
{% endconfiguration %}

## Lock commands

Widget that displays buttons to lock or unlock a [lock](/integrations/lock).

<p class='img'>
  <img src='/images/dashboards/features/lock_feature_commands.png' alt='Screenshot of the tile card with the lock commands feature'>
  Screenshot of the tile card with the lock commands feature
</p>

```yaml
features:
  - type: "lock-commands"
```

{% configuration features %}
type:
  required: true
  description: "`lock-commands`"
  type: string
{% endconfiguration %}

## Lock open door

Widget that displays a button to [open a door](/integrations/lock).

<p class='img'>
  <img src='/images/dashboards/features/lock_feature_open_door.png' alt='Screenshot of the tile card with the lock open door feature'>
  Screenshot of the tile card with the lock open door feature
</p>

```yaml
features:
  - type: "lock-open-door"
```

{% configuration features %}
type:
  required: true
  description: "`lock-open-door`"
  type: string
{% endconfiguration %}

## Media player volume slider

Widget that displays a slider to control the volume for a [media player](/integrations/media_player).

<p class='img'>
  <img src='/images/dashboards/features/media_player_volume_slider.png' alt='Screenshot of the tile card with media player volume slider feature'>
  Screenshot of the tile card with media player volume slider feature
</p>

```yaml
features:
  - type: "media-player-volume-slider"
```

{% configuration features %}
type:
  required: true
  description: "`media-player-volume-slider`"
  type: string
{% endconfiguration %}

## Numeric input

Widget that displays a slider or buttons to set the value for a [number](/integrations/number) or [input number](/integrations/input_number).

<p class='img'>
  <img src='/images/dashboards/features/numeric_input.png' alt='Screenshot of the tile card with the numeric input feature'>
  Screenshot of the tile card with the numeric input feature
</p>

```yaml
features:
  - type: "numeric-input"
    style: "buttons"
```

{% configuration features %}
type:
  required: true
  description: "`numeric-input`"
  type: string
style:
  required: false
  description: "Which style of control to display. It can be either `buttons` or `slider`."
  type: string
  default: slider
{% endconfiguration %}

## Target humidity

Widget that displays a slider to select the target humidity for a [humidifier](/integrations/humidifier).

<p class='img'>
  <img src='/images/dashboards/features/target_humidity.png' alt='Screenshot of the tile card with the target humidity feature'>
  Screenshot of the tile card with the target humidity feature
</p>

```yaml
features:
  - type: "target-humidity"
```

{% configuration features %}
type:
  required: true
  description: "`target-humidity`"
  type: string
{% endconfiguration %}

## Target temperature

Widget that displays buttons to select the target temperature for a [climate](/integrations/climate) or a [water heater](/integrations/water_heater).

<p class='img'>
  <img src='/images/dashboards/features/target_temperature.png' alt='Screenshot of the tile card with the target temperature feature'>
  Screenshot of the tile card with the target temperature feature
</p>

```yaml
features:
  - type: "target-temperature"
```

{% configuration features %}
type:
  required: true
  description: "`target-temperature`"
  type: string
{% endconfiguration %}

## Update actions

Widget that displays actions to install or skip an [update](/integrations/update).

<p class='img'>
  <img src='/images/dashboards/features/update_actions.png' alt='Screenshot of the tile card with update actions feature'>
  Screenshot of the tile card with update actions feature
</p>

```yaml
features:
  - type: "update-actions"
    backup: "ask"
```

{% configuration features %}
type:
  required: true
  description: "`update-actions`"
  type: string
backup:
  required: false
  description: Whether a backup should be done before updating. The value can be `ask`, `yes`, or `no`. `ask` will open a dialog to ask if a backup should be done.
  type: list
  default: ask
{% endconfiguration %}

## Vacuum commands

Widget that displays buttons to control a [vacuum](/integrations/vacuum).

<p class='img'>
  <img src='/images/dashboards/features/vacuum_commands.png' alt='Screenshot of the tile card with vacuum commands feature'>
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

{% configuration features %}
type:
  required: true
  description: "`vacuum-commands`"
  type: string
commands:
  required: true
  description: List of commands to show on the card. The list can contain `start_pause`, `stop`, `clean_spot`, `locate`, and `return_home`.
  type: list
{% endconfiguration %}

## Water heater operation modes

Widget that displays buttons to control the operation mode of a [water heater](/integrations/water_heater).

<p class='img'>
  <img src='/images/dashboards/features/water_heater_operation_modes.png' alt='Screenshot of the tile card with the water heater operation modes feature'>
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

{% configuration features %}
type:
  required: true
  description: "`water-heater-operation-modes`"
  type: string
operation_modes:
  required: true
  description: List of modes to show on the card. The list can contain `electric`, `gas`, `heat_pump`, `eco`, `performance`, `high_demand`, and `off`.
  type: list
{% endconfiguration %}

