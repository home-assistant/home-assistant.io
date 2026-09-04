---
title: "Morph effect"
action: lifx.effect_morph
domain: lifx
description: "Start the firmware-based Morph effect on a matrix LIFX light, such as the LIFX Tile or Candle."
related_actions:
  - lifx.effect_flame
  - lifx.effect_sky
  - lifx.paint_theme
  - lifx.effect_stop
---

Use this action to start the firmware-based Morph effect on a matrix LIFX light, such as the LIFX Tile or Candle. The effect drifts soft blobs of color across the light, so it works well as ambient lighting for a living room, a home office, or a party.

You choose the colors in one of two ways: pick one of the predefined themes, which match the themes in the LIFX smartphone app, or supply your own palette of 2 to 16 colors. You can't use both at once. The Morph effect runs on the light itself, so it keeps going even if Home Assistant restarts. To stop it, use [Stop effect](/actions/lifx.effect_stop/).

{% include actions/ui_header.md %}

To start the Morph effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Morph effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Pick a value in **Theme**, or fill in **Palette** with your own colors. Use **Speed** to control how quickly the colors drift.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How long, in seconds, one complete animation cycle takes. Choose a whole number between 1 and 25.
  required: false
Palette:
  description: Your own list of 2 to 16 colors, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). Use this instead of a theme, not alongside one.
  required: false
Theme:
  description: A predefined color theme to use for the effect. Use this instead of a palette, not alongside one.
  required: false
Power on:
  description: Turn this off to leave lights that are currently off untouched.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_morph`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_morph
  target:
    entity_id: light.living_room_tiles
  data:
    theme: tropical
    speed: 5
{% endexample %}

This drifts the colors of the `tropical` theme across the living room tiles, taking five seconds for one complete cycle.

### Options in YAML

{% options_yaml %}
speed:
  description: How long, in seconds, one complete animation cycle takes. Accepts a whole number between 1 and 25.
  required: false
  type: integer
  default: 3
palette:
  description: Your own list of 2 to 16 colors, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). Can't be combined with a theme.
  required: false
  type: list
theme:
  description: A predefined color theme to use for the effect. Can't be combined with a palette. If you provide neither, the `exciting` theme is used.
  required: false
  type: string
  default: exciting
power_on:
  description: Set to false to leave lights that are currently off untouched.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Available themes

The following themes are available:

- `arctic`
- `aurora_borealis`
- `autumn`
- `bias_lighting`
- `blissful`
- `calaveras`
- `cheerful`
- `cherry_blossom`
- `christmas`
- `coral_reef`
- `cyberpunk`
- `deep_sea`
- `desert`
- `dream`
- `earth`
- `energizing`
- `epic`
- `evening`
- `exciting`
- `fantasy`
- `fire`
- `focusing`
- `forest`
- `galaxy`
- `gentle`
- `halloween`
- `hanukkah`
- `holly`
- `hygge`
- `independence`
- `intense`
- `kwanzaa`
- `love`
- `mellow`
- `neon`
- `party`
- `peaceful`
- `powerful`
- `proud`
- `pumpkin`
- `relaxing`
- `romance`
- `santa`
- `serene`
- `shamrock`
- `soothing`
- `spacey`
- `sports`
- `spring`
- `stardust`
- `thanksgiving`
- `tranquil`
- `tropical`
- `vaporwave`
- `warming`
- `water`
- `zombie`

{% include actions/targets.md domain="light" %}

## Good to know

- Only matrix lights run the Morph effect. That means the LIFX Tile, Candle, Path, Spot, Tube, Luna, Mirror, and Ceiling. If your target also covers other LIFX lights, those lights are skipped and the rest of the action still runs.
- If the target contains no LIFX light at all, the action fails with the message "The targets of action lifx.effect_morph include no LIFX light".
- **Palette** and **Theme** are mutually exclusive. Setting both is rejected. If you set neither, the `exciting` theme is used.
- Each palette color is a list of four numbers in the order hue, saturation, brightness, Kelvin. A palette needs at least 2 and at most 16 colors.
- **Power on** is on by default, so a light that is off is turned on before the effect starts.
- To stop the animation, use [Stop effect](/actions/lifx.effect_stop/).
- You can also start this effect with default options by calling [Turn on a light](/actions/light.turn_on/) with the effect set to `effect_morph`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: ease into the day at sunrise

Start a slow, warm Morph effect on the bedroom tiles at sunrise using your own palette of amber and gold.

- **Trigger**: Sunrise
- **Action**: Morph effect
  - **Target**: Bedroom tiles (`light.bedroom_tiles`)

{% example %}
automation: |
  alias: "Sunrise morph in the bedroom"
  triggers:
    - trigger: sun
      event: sunrise
  actions:
    - action: lifx.effect_morph
      target:
        entity_id: light.bedroom_tiles
      data:
        speed: 20
        palette:
          - [40, 80, 60, 3500]
          - [25, 90, 45, 2700]
          - [55, 60, 70, 4000]
{% endexample %}

### Automation: show a color burst when the doorbell rings

When someone rings the doorbell, run a fast, colorful Morph effect on the hallway tiles for 30 seconds, then stop it.

- **Trigger**: Doorbell is pressed
- **Action**: Morph effect
  - **Target**: Hallway tiles (`light.hallway_tiles`)
- **Action**: Stop effect
  - **Target**: Hallway tiles (`light.hallway_tiles`)

{% example %}
automation: |
  alias: "Doorbell color burst"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: lifx.effect_morph
      target:
        entity_id: light.hallway_tiles
      data:
        speed: 1
        theme: party
    - delay:
        seconds: 30
    - action: lifx.effect_stop
      target:
        entity_id: light.hallway_tiles
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
