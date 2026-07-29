---
title: "Sky effect"
action: lifx.effect_sky
domain: lifx
description: "Start a firmware-based effect that animates a sky scene across a LIFX Ceiling, Luna, Mirror, E26 Candle, or E26 Tube."
related_actions:
  - lifx.effect_morph
  - lifx.effect_flame
  - lifx.paint_theme
  - lifx.effect_stop
---

Use this action to animate a sky scene across a LIFX Ceiling, Luna, Mirror, E26 Candle, or E26 Tube. The effect runs on the light itself, so it keeps going even if Home Assistant restarts. You can choose between three sky types, **Clouds**, **Sunrise**, and **Sunset**, and the default speed and colors for each one match the LIFX smartphone app.

The LIFX app presents these as three separate effects. In Home Assistant, they are one action, and you pick between them with the **Sky type** option.

This is a good way to start the day with a slow sunrise in the bedroom, wind down with a sunset in the evening, or keep a gentle cloud animation running in the background. If your target includes LIFX lights that don't support the Sky effect, those lights are left as they are.

{% include actions/ui_header.md %}

To run the Sky effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sky effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your light is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. In **Sky type**, choose the sky you want to animate, then set **Speed** to control how long the animation takes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Power on:
  description: Turn the light on before the effect starts. This is on by default. Turn it off to leave a light that is already off untouched.
  required: false
Speed:
  description: For the **Sunrise** and **Sunset** sky types, how long the effect takes to complete, in seconds. For the **Clouds** sky type, how fast the clouds move across the light. Accepts 1 to 86400 seconds, and defaults to 50.
  required: false
Sky type:
  description: The style of sky to animate. Choose **Clouds**, **Sunrise**, or **Sunset**. Defaults to **Clouds**.
  required: false
Cloud saturation minimum:
  description: The minimum cloud saturation for the **Clouds** sky type, from 0 to 255. Defaults to 50.
  required: false
Cloud saturation maximum:
  description: The maximum cloud saturation for the **Clouds** sky type, from 0 to 255. Defaults to 180.
  required: false
Palette:
  description: A list of 1 to 6 colors to use instead of the built-in colors for the selected sky type. Each color is a hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000) value.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_sky`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_sky
  target:
    entity_id: light.lifx_ceiling
  data:
    sky_type: Sunrise
    speed: 600
{% endexample %}

This runs a ten-minute sunrise across the LIFX Ceiling light.

### Options in YAML

{% options_yaml %}
power_on:
  description: Turn the light on before the effect starts. Set to `false` to leave a light that is already off untouched.
  required: false
  type: boolean
  default: true
speed:
  description: For the `Sunrise` and `Sunset` sky types, how long the effect takes to complete, in seconds. For the `Clouds` sky type, how fast the clouds move across the light. Accepts 1 to 86400 seconds.
  required: false
  type: integer
  default: 50
sky_type:
  description: "The style of sky to animate. One of `Clouds`, `Sunrise`, or `Sunset`."
  required: false
  type: string
  default: Clouds
cloud_saturation_min:
  description: The minimum cloud saturation for the `Clouds` sky type, from 0 to 255.
  required: false
  type: integer
  default: 50
cloud_saturation_max:
  description: The maximum cloud saturation for the `Clouds` sky type, from 0 to 255.
  required: false
  type: integer
  default: 180
palette:
  description: A list of 1 to 6 colors to use instead of the built-in colors for the selected sky type. Each color is a hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000) value.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- The Sky effect needs a matrix light running firmware 4 or later. The LIFX Ceiling, Luna, Mirror, E26 Candle, and E26 Tube ship with it. Matrix lights still on firmware 3, such as the E12 Candle, do not support the effect. Any other LIFX light in the same target is skipped without an error, so you can safely point this action at a whole area.
- How much detail you see depends on the light. The **Clouds** sky type spreads a pattern across the pixels, so it looks most detailed on a light with many of them, like the Ceiling. On a light with only a handful of zones, such as the Path, you still get a blue sky with lighter shapes drifting past, just a coarser one. The **Sunrise** and **Sunset** sky types shift color over time instead, so they look much the same on any supported light.
- In the **Effect** option of the [Turn on a light](/actions/light.turn_on/) action, Sky is currently offered on LIFX Ceiling lights only. On the other supported lights, use this action instead.
- If the target contains no LIFX light at all, the action fails with the message "The targets of action lifx.effect_sky include no LIFX light".
- The palette is shared between all three sky types. To use a custom palette, provide all six colors in this order:
  1. Sky: the background sky color for the **Clouds** sky type.
  2. Night sky: the starting or finishing color of the sky when no sun is visible, for the **Sunrise** and **Sunset** sky types.
  3. Dawn sky: the color of the sky just as the sun appears.
  4. Dawn sun: the color of the sun just as it appears.
  5. Full sun: the color of the sun as it covers the whole light.
  6. Final sun: the color of the full sun at the end of the effect.
- To stop the animation, use the [Stop effect](/actions/lifx.effect_stop/) action. The light goes back to the color and power state it had before the effect started.
- Because the effect runs in the light's firmware, it keeps running until you stop it, turn the light off, or start a different effect.
- You can also start this effect with default options by calling [Turn on a light](/actions/light.turn_on/) with the effect set to `effect_sky`.
- Home Assistant checks the state of your LIFX lights every 10 seconds, so the light's state in the interface can take a few seconds to catch up after you start the effect.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: wake up to a slow sunrise

Start a 15-minute sunrise on the bedroom ceiling light in the morning, so the room brightens gradually before your alarm goes off.

- **Trigger**: Time: 06:15
- **Action**: Sky effect
  - **Target**: Bedroom ceiling (`light.bedroom_ceiling`)
  - **Sky type**: Sunrise
  - **Speed**: 900

{% example %}
automation: |
  alias: "Wake up to a sunrise on the bedroom ceiling"
  triggers:
    - trigger: time
      at: "06:15:00"
  actions:
    - action: lifx.effect_sky
      target:
        entity_id: light.bedroom_ceiling
      data:
        sky_type: Sunrise
        speed: 900
{% endexample %}

### Automation: run a sunset in the living room when the sun goes down

When the sun sets, animate a matching sunset across the living room ceiling light over half an hour.

- **Trigger**: Sun: sunset
- **Action**: Sky effect
  - **Target**: Living room ceiling (`light.living_room_ceiling`)
  - **Sky type**: Sunset
  - **Speed**: 1800

{% example %}
automation: |
  alias: "Run a sunset in the living room at sundown"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.effect_sky
      target:
        entity_id: light.living_room_ceiling
      data:
        sky_type: Sunset
        speed: 1800
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
