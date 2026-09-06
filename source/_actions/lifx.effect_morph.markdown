---
title: Morph effect
action: lifx.effect_morph
domain: lifx
description: "Run the firmware-based Morph effect on LIFX matrix lights."
related_actions:
  - lifx.effect_flame
  - lifx.effect_stop
---

Use this action to run the firmware-based Morph effect, which animates blobs of color across the device. This is a hardware effect, so it only works on LIFX matrix lights such as the Tile, Candle, Path, Spot, and Ceiling.

You must provide either a palette or a theme to use for the effect, but not both. The palette lets you pick the exact colors, while the theme lets you choose one of the predefined themes that match those in the LIFX smartphone app.

By default, the light is turned on when the effect starts. Turn off the power on option to leave a light that is off untouched.

{% include actions/ui_header.md %}

To run the morph effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX matrix lights you want to animate.
6. From the actions shown for that target, select **Morph effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How fast the colors move, as the number of seconds for the effect to travel the length of the device (1 to 25).
Palette:
  description: A list of 2 to 16 colors to use for the effect, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). This overrides the theme.
Theme:
  description: The predefined color theme to use for the effect. This is overridden by the palette.
Power on:
  description: Turn this off to keep a light that is off from being turned on before the effect starts.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_morph`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_morph
  target:
    entity_id: light.lifx_tile
  data:
    theme: exciting
    speed: 5
{% endexample %}

This starts the Morph effect on the LIFX Tile using the `exciting` theme.

### Options in YAML

{% options_yaml %}
speed:
  description: How fast the colors move, as the number of seconds for the effect to travel the length of the device (1 to 25).
  required: false
  type: integer
  default: 3
palette:
  description: A list of 2 to 16 colors to use for the effect, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). This overrides the theme.
  required: false
  type: list
theme:
  description: The predefined color theme to use for the effect. This is overridden by the palette.
  required: false
  type: string
power_on:
  description: Set to false to keep a light that is off from being turned on before the effect starts.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Available themes

The available themes are:

- `autumn`
- `bias_lighting`
- `blissful`
- `calaveras`
- `cheerful`
- `christmas`
- `dream`
- `energizing`
- `epic`
- `evening`
- `exciting`
- `fantasy`
- `focusing`
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
- `warming`
- `zombie`

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
