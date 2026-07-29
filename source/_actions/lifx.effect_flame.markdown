---
title: "Flame effect"
action: lifx.effect_flame
domain: lifx
description: "Start the firmware-based Flame effect on a matrix LIFX light, such as the LIFX Tile or Candle."
related_actions:
  - lifx.effect_morph
  - lifx.effect_sky
  - lifx.paint_theme
  - lifx.effect_stop
---

Use this action to start the firmware-based Flame effect on a matrix LIFX light, such as the LIFX Tile or Candle. The effect animates a warm, flickering flame across the light, which makes it a nice fit for a mantelpiece, a dinner table, or a cozy corner of a room.

The Flame effect runs on the light itself, so it keeps going even if Home Assistant restarts. To stop it, use [Stop effect](/actions/lifx.effect_stop/).

{% include actions/ui_header.md %}

To start the Flame effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Flame effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Set **Speed** to control how quickly the flames move. Lower values make a livelier flame, higher values a slower one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How long, in seconds, one complete animation cycle takes. Choose a whole number between 1 and 25.
  required: false
Power on:
  description: Turn this off to leave lights that are currently off untouched.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_flame`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_flame
  target:
    entity_id: light.mantel_candle
  data:
    speed: 5
{% endexample %}

This starts a slow, gentle flame on the mantel candle, taking five seconds for one complete cycle.

### Options in YAML

{% options_yaml %}
speed:
  description: How long, in seconds, one complete animation cycle takes. Accepts a whole number between 1 and 25.
  required: false
  type: integer
  default: 3
power_on:
  description: Set to false to leave lights that are currently off untouched.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Only matrix lights run the Flame effect. That means the LIFX Tile, Candle, Path, Spot, Tube, Luna, Mirror, and Ceiling. If your target also covers other LIFX lights, those lights are skipped and the rest of the action still runs.
- If the target contains no LIFX light at all, the action fails with the message "The targets of action lifx.effect_flame include no LIFX light".
- The Flame effect uses its own built-in colors, so it has no theme or palette option. If you want to choose the colors yourself, use [Morph effect](/actions/lifx.effect_morph/) instead.
- **Power on** is on by default, so a light that is off is turned on before the effect starts.
- To stop the animation, use [Stop effect](/actions/lifx.effect_stop/).
- You can also start this effect with default options by calling [Turn on a light](/actions/light.turn_on/) with the effect set to `effect_flame`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: light a virtual candle at sunset

Start a gentle flame on the mantel candle every evening as the sun goes down.

- **Trigger**: Sunset
- **Action**: Flame effect
  - **Target**: Mantel candle (`light.mantel_candle`)

{% example %}
automation: |
  alias: "Light the mantel candle at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.effect_flame
      target:
        entity_id: light.mantel_candle
      data:
        speed: 6
{% endexample %}

### Automation: greet visitors after dark

When the front door opens after sunset, run a lively flame on the entryway tiles for one minute, then stop it.

- **Trigger**: Front door opens
- **Condition**: The sun is below the horizon
- **Action**: Flame effect
  - **Target**: Entryway tiles (`light.entryway_tiles`)
- **Action**: Stop effect
  - **Target**: Entryway tiles (`light.entryway_tiles`)

{% example %}
automation: |
  alias: "Flame welcome at the front door"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: lifx.effect_flame
      target:
        entity_id: light.entryway_tiles
      data:
        speed: 1
    - delay:
        minutes: 1
    - action: lifx.effect_stop
      target:
        entity_id: light.entryway_tiles
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
