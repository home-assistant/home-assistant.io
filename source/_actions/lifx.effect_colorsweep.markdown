---
title: "Color sweep effect"
action: lifx.effect_colorsweep
domain: lifx
description: "Start the firmware-based Color Sweep effect, which the LIFX app offers as the Makeup Check button action, on a LIFX Mirror."
related_actions:
  - lifx.effect_morph
  - lifx.effect_sky
  - lifx.effect_flame
  - lifx.effect_stop
---

Use this action to start the firmware-based Color Sweep effect on a LIFX Mirror. While the LIFX app does not list it as an effect, it is the factory default action for the **FX** button, which the app calls **Makeup Check**. With this action, you can start it without pressing a button and change how it runs. The default options match the FX button. The Mirror sweeps once across the color temperature range, from 1500 to 6500 Kelvin, over 30 seconds. This lets you see how your makeup looks under different kinds of light. You can also give it your own palette of colors to sweep through.

The Color Sweep effect runs on the Mirror itself, so it keeps going even if Home Assistant restarts. To stop it early, use [Stop effect](/actions/lifx.effect_stop/).

{% include actions/ui_header.md %}

To start the Color Sweep effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Color sweep effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick your LIFX Mirror, or the area it is in (like your bathroom or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. _Optional_: set **Speed** to control how long each sweep takes, **Duration** to control how long the effect runs, and **Palette** to choose the colors it sweeps through.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How long, in seconds, one sweep through the palette takes. Choose a whole number between 0 and 25. At 0, which is the default, the Mirror sweeps once across the whole duration, which then has to be above 0.
  required: false
Duration:
  description: How long, in seconds, the effect runs. Choose a whole number between 0 and 3600. Defaults to 30 seconds. At 0, the effect runs until you stop it, which needs a **Speed** above 0.
  required: false
Palette:
  description: A list of 2 to 16 colors to sweep through, each as hue (0-360), saturation (0-100), brightness (0-100), and Kelvin (1500-9000). Defaults to full-brightness white at 1500 Kelvin and at 6500 Kelvin, which sweeps across the color temperature range.
  required: false
Power on:
  description: Turn this off to leave a Mirror that is currently off untouched. On by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_colorsweep`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_colorsweep
  target:
    entity_id: light.bathroom_mirror
  data:
    duration: 60
{% endexample %}

This sweeps the bathroom Mirror once across the color temperature range, taking one minute.

### Options in YAML

{% options_yaml %}
speed:
  description: How long, in seconds, one sweep through the palette takes. Accepts a whole number between 0 and 25. At 0, the Mirror sweeps once across the whole duration, which then has to be above 0.
  required: false
  type: integer
  default: 0
duration:
  description: How long, in seconds, the effect runs. Accepts a whole number between 0 and 3600. At 0, the effect runs until you stop it, which needs a `speed` above 0.
  required: false
  type: integer
  default: 30
palette:
  description: A list of 2 to 16 colors to sweep through, each as `[hue, saturation, brightness, kelvin]`, with hue from 0 to 360, saturation and brightness from 0 to 100, and Kelvin from 1500 to 9000.
  required: false
  type: list
  default: "[[0, 0, 100, 1500], [0, 0, 100, 6500]]"
power_on:
  description: Set to false to leave a Mirror that is currently off untouched.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Only the LIFX Mirror runs the Color Sweep effect. If your target also covers other LIFX lights, those lights are skipped and the rest of the action still runs.
- When you target lights by entity and none of them is a LIFX light, the action fails with the message "The targets of action lifx.effect_colorsweep include no LIFX light". If they include LIFX lights but no Mirror, it fails with "The targets of action lifx.effect_colorsweep include no LIFX Mirror". When you target an area, floor, device, or label instead, lights the effect cannot run on are left alone and no error is returned.
- With the default **Speed** of 0, the Mirror sweeps through the palette once, spread across the whole **Duration**. Set **Speed** above 0 to repeat the sweep instead, with each sweep taking that many seconds, until the duration is up. Speed 0 with a duration of 0 fails with an error, because the effect would otherwise run at a default speed instead.
- **Power on** is on by default, so a Mirror that is off is turned on before the effect starts.
- To stop the effect before the duration is up, use [Stop effect](/actions/lifx.effect_stop/).
- You can also start this effect with default options by calling [Turn on a light](/actions/light.turn_on/) with the effect set to `effect_colorsweep`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: check your makeup under different light

Sweep the bathroom Mirror slowly across the color temperature range, so you can see how your makeup looks in both warm light and cool daylight.

- **Action**: Color sweep effect
  - **Target**: Bathroom Mirror (`light.bathroom_mirror`)

{% example %}
script: |
  alias: "Makeup check"
  sequence:
    - action: lifx.effect_colorsweep
      target:
        entity_id: light.bathroom_mirror
      data:
        duration: 90
{% endexample %}

### Automation: sweep through party colors

When the party scene is turned on, sweep the Mirror through a palette of bright colors. Each sweep takes five seconds, and the sweeps repeat until the effect is stopped.

- **Trigger**: The party scene is activated
- **Action**: Color sweep effect
  - **Target**: Hallway Mirror (`light.hallway_mirror`)

{% example %}
automation: |
  alias: "Party colors on the Mirror"
  triggers:
    - trigger: state
      entity_id: scene.party
  actions:
    - action: lifx.effect_colorsweep
      target:
        entity_id: light.hallway_mirror
      data:
        speed: 5
        duration: 0
        palette:
          - [0, 100, 100, 3500]
          - [120, 100, 100, 3500]
          - [240, 100, 100, 3500]
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
