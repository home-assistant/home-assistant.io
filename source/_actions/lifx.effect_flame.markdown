---
title: Flame effect
action: lifx.effect_flame
domain: lifx
description: "Run the firmware-based Flame effect on LIFX matrix lights."
related_actions:
  - lifx.effect_morph
  - lifx.effect_stop
---

Use this action to run the firmware-based Flame effect, which animates a flame across the device. This is a hardware effect, so it only works on LIFX matrix lights such as the Tile, Candle, Path, Spot, and Ceiling.

By default, the light is turned on when the effect starts. Turn off the power on option to leave a light that is off untouched.

{% include actions/ui_header.md %}

To run the flame effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX matrix lights you want to animate.
6. From the actions shown for that target, select **Flame effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How fast the flames move, as the number of seconds for the effect to travel the length of the device (1 to 25).
Power on:
  description: Turn this off to keep a light that is off from being turned on before the effect starts.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_flame`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_flame
  target:
    entity_id: light.lifx_tile
  data:
    speed: 4
{% endexample %}

This starts the Flame effect on the LIFX Tile.

### Options in YAML

{% options_yaml %}
speed:
  description: How fast the flames move, as the number of seconds for the effect to travel the length of the device (1 to 25).
  required: false
  type: integer
  default: 3
power_on:
  description: Set to false to keep a light that is off from being turned on before the effect starts.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
