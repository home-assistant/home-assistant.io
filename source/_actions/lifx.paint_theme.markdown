---
title: "Paint theme"
action: lifx.paint_theme
domain: lifx
description: "Paints either a provided theme or custom palette across one or more LIFX lights."
related_actions:
  - lifx.effect_morph
  - lifx.effect_move
  - lifx.set_state
  - lifx.effect_stop
---

Use this action to paint a set of colors across one or more LIFX lights in a single step. You pick one of the [predefined themes](/integrations/lifx/#themes), or supply your own palette of 2 to 16 colors. Unlike the effect actions, it paints a still arrangement of colors, and the lights hold it until something else changes them.

This works well for setting a mood in a room, decorating for a holiday, or giving a group of lights a coordinated look without picking a color for each one. Lights that have several zones, such as LIFX Z, Lightstrip, Beam, Tile, and Candle, show the most of a theme, because the colors are spread across the zones of the light.

{% include actions/ui_header.md %}

To paint a theme from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Paint theme**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Pick a value in **Theme**, or fill in **Palette** with your own colors. Use **Transition** to control how long the change takes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Palette:
  description: Your own list of 2 to 16 colors to paint across the target lights, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). Use this instead of a theme, not alongside one.
  required: false
Theme:
  description: A predefined color theme to paint. Use this instead of a palette, not alongside one. Defaults to `exciting`.
  required: false
Transition:
  description: How long the change takes, in seconds. Accepts a whole number between 0 and 3600, and defaults to 1.
  required: false
Power on:
  description: Turn the lights on before the theme is painted. This is on by default. Turn it off to leave lights that are already off untouched.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.paint_theme`. A basic example looks like this:

{% example %}
action: |
  action: lifx.paint_theme
  target:
    entity_id: light.living_room
  data:
    theme: halloween
    transition: 2
{% endexample %}

This paints the `halloween` theme across the living room lights over two seconds.

### Options in YAML

{% options_yaml %}
palette:
  description: Your own list of 2 to 16 colors to paint across the target lights, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). Can't be combined with a theme.
  required: false
  type: list
theme:
  description: A predefined color theme to paint. Can't be combined with a palette. If you provide neither, the `exciting` theme is used.
  required: false
  type: string
  default: exciting
transition:
  description: How long the change takes, in seconds. Accepts a whole number between 0 and 3600.
  required: false
  type: integer
  default: 1
power_on:
  description: Turn the lights on before the theme is painted. Set to `false` to leave lights that are already off untouched.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Available themes

The [Themes](/integrations/lifx/#themes) section of the LIFX integration page lists every theme by category, along with the renamed and retired themes and their replacements.

{% include actions/targets.md domain="light" %}

## Good to know

- This action works with every LIFX light, not just the ones that support firmware effects. When you target lights by entity and none of them is a LIFX light, the action fails with the message "The targets of action lifx.paint_theme include no LIFX light". When you target an area, floor, device, or label that holds no LIFX light, nothing happens and no error is returned.
- **Palette** and **Theme** are mutually exclusive. Setting both is rejected. If you set neither, the `exciting` theme is used.
- Each palette color is a list of four numbers in the order hue, saturation, brightness, Kelvin. A palette needs at least 2 and at most 16 colors. A saturation or brightness of 1 or less is read as a fraction, so `0.5` and `50` both mean 50%, and `1` means 100%, not 1%.
- Painting a theme is not an animation, so there is nothing to stop afterwards. To clear a running firmware effect first, use the [Stop effect](/actions/lifx.effect_stop/) action.
- Every paint arranges the colors at random, even when you paint the same theme again. If you repaint a theme over and over with a long transition, the light drifts slowly from one arrangement to the next and looks animated. The action returns as soon as the colors are sent, so wait for the transition to finish before painting again. For an example, refer to [slowly drift through a theme](#automation-slowly-drift-through-a-theme-in-the-evening).
- The same themes are also available on the [Move effect](/actions/lifx.effect_move/) and the [Morph effect](/actions/lifx.effect_morph/), and from the theme selector on the device page.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: paint a warm theme in the living room at sunset

When the sun sets, ease the living room lights into the `warming` theme over ten seconds so the room shifts to an evening mood on its own.

- **Trigger**: Sun: sunset
- **Action**: Paint theme
  - **Target**: Living room (`light.living_room`)
  - **Theme**: warming
  - **Transition**: 10

{% example %}
automation: |
  alias: "Paint a warm theme in the living room at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.paint_theme
      target:
        entity_id: light.living_room
      data:
        theme: warming
        transition: 10
{% endexample %}

### Automation: welcome someone home with a custom palette

When a person arrives home, paint your own two-color palette across the hallway lights and send a notification to your phone.

- **Trigger**: Person enters the Home zone
- **Action**: Paint theme
  - **Target**: Hallway (`light.hallway`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% example %}
automation: |
  alias: "Welcome home lighting in the hallway"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.home
      event: enter
  actions:
    - action: lifx.paint_theme
      target:
        entity_id: light.hallway
      data:
        palette:
          - [30, 70, 80, 3000]
          - [200, 60, 60, 4000]
        transition: 3
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Welcome home. The hallway lights are on.
{% endexample %}

### Automation: slowly drift through a theme in the evening

At sunset, repaint the `tranquil` theme across the living room strip every minute with a one-minute transition, until the strip is turned off. Each paint arranges the colors differently, so the strip drifts slowly from one arrangement to the next.

- **Trigger**: Sun: sunset
- **Action**: Repeat while the strip is on
  - **Action**: Paint theme
    - **Target**: Living room strip (`light.living_room_strip`)
    - **Theme**: tranquil
    - **Transition**: 60
  - **Action**: Delay of 60 seconds

{% example %}
automation: |
  alias: "Drift through a theme on the living room strip"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - repeat:
        while:
          - condition: state
            entity_id: light.living_room_strip
            state: "on"
        sequence:
          - action: lifx.paint_theme
            target:
              entity_id: light.living_room_strip
            data:
              theme: tranquil
              transition: 60
              power_on: false
          - delay:
              seconds: 60
{% endexample %}

Setting **Power on** to `false` means the loop never switches the strip back on after someone turns it off, and the next check ends the loop.

{% include actions/stuck.md %}

{% include actions/related.md %}
