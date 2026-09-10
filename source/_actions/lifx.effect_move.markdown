---
title: "Move effect"
action: lifx.effect_move
domain: lifx
description: "Start the firmware-based Move effect on a multizone LIFX light, such as the LIFX Z, Lightstrip, or Beam."
related_actions:
  - lifx.paint_theme
  - lifx.set_state
  - lifx.effect_colorloop
  - lifx.effect_stop
---

Use this action to start the firmware-based Move effect on a multizone LIFX light. The effect scrolls the colors that are already on the light along its length, so it is a good fit for accent lighting behind a TV, under a kitchen counter, or along a hallway.

The Move effect runs on the light itself, so it keeps going even if Home Assistant restarts. Because the light animates its existing colors, the effect is invisible when every zone is set to the same color. Give the light something to move by choosing a theme, or by setting the colors first with [Paint theme](/actions/lifx.paint_theme/) or [Set state](/actions/lifx.set_state/). To stop the effect, use [Stop effect](/actions/lifx.effect_stop/).

{% include actions/ui_header.md %}

To start the Move effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Move effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Set **Speed** and **Direction** to control the animation. To recolor the light before the effect starts, pick a value in **Theme**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How long, in seconds, the effect takes to move across the length of the light. Choose a value between 0.1 and 60.
  required: false
Direction:
  description: "The direction the colors move along the light. Select either `right` or `left`."
  required: false
Theme:
  description: A predefined color theme to set on the light before the effect starts. Leave this empty to animate the colors the light already shows.
  required: false
Power on:
  description: Turn this off to leave lights that are currently off untouched.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_move`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_move
  target:
    entity_id: light.living_room_strip
  data:
    speed: 5
    direction: left
{% endexample %}

This scrolls the colors already on the living room strip to the left, taking five seconds for one complete cycle.

### Options in YAML

{% options_yaml %}
speed:
  description: How long, in seconds, the effect takes to move across the length of the light. Accepts a value between 0.1 and 60, in steps of 0.1.
  required: false
  type: float
  default: 3.0
direction:
  description: "The direction the colors move along the light. Accepts either `right` or `left`."
  required: false
  type: string
  default: right
theme:
  description: A predefined color theme to set on the light before the effect starts. If you leave this out, the light keeps the colors it already shows.
  required: false
  type: string
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

- Only multizone lights run the Move effect. That means the LIFX Z, Lightstrip, Beam, Neon, Outdoor Neon, String, and Permanent Outdoor. If your target also covers other LIFX lights, those lights are skipped and the rest of the action still runs.
- If the target contains no LIFX light at all, the action fails with the message "The targets of action lifx.effect_move include no LIFX light".
- **Theme** is optional and Home Assistant applies no theme when you leave it out, so the light keeps whatever colors it already shows. Pick a theme when you want a known starting point.
- The effect is invisible when every zone on the light is the same color. Use [Paint theme](/actions/lifx.paint_theme/) or [Set state](/actions/lifx.set_state/) to give the light a mix of colors first, or choose a theme in this action.
- You can change the colors while the effect is running. The animation continues with the new colors.
- **Power on** is on by default, so a light that is off is turned on before the effect starts.
- To stop the animation, use [Stop effect](/actions/lifx.effect_stop/).
- You can also start this effect with default options by calling [Turn on a light](/actions/light.turn_on/) with the effect set to `effect_move`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start a moving light effect at sunset

Set an evening mood on the living room strip when the sun goes down, with the colors drifting slowly to the left.

- **Trigger**: Sunset
- **Action**: Move effect
  - **Target**: Living room strip (`light.living_room_strip`)

{% example %}
automation: |
  alias: "Start the Move effect at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.effect_move
      target:
        entity_id: light.living_room_strip
      data:
        speed: 10
        theme: evening
{% endexample %}

### Automation: welcome someone home with a short light show

When someone arrives home, run a fast, colorful animation on the hallway beam for two minutes, then stop it.

- **Trigger**: Anne arrives home
- **Action**: Move effect
  - **Target**: Hallway beam (`light.hallway_beam`)
- **Action**: Stop effect
  - **Target**: Hallway beam (`light.hallway_beam`)

{% example %}
automation: |
  alias: "Welcome home light show"
  triggers:
    - trigger: state
      entity_id: person.anne
      to: "home"
  actions:
    - action: lifx.effect_move
      target:
        entity_id: light.hallway_beam
      data:
        speed: 1.5
        theme: party
    - delay:
        minutes: 2
    - action: lifx.effect_stop
      target:
        entity_id: light.hallway_beam
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
