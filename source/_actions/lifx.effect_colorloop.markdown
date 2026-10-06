---
title: "Color loop effect"
action: lifx.effect_colorloop
domain: lifx
description: "Run an effect on LIFX lights that loops colors around the color wheel."
related_actions:
  - lifx.effect_pulse
  - lifx.effect_move
  - lifx.paint_theme
  - lifx.effect_stop
---

The **Color loop effect** action runs an effect with looping colors, moving each light steadily around the color wheel. It's a nice fit for parties, holidays, or any time you want gentle, shifting color in a room.

This is a software effect, which means Home Assistant drives each color change over your network. It needs color-capable LIFX lights, so white-only models can't run it. It also runs on lights connected over Thread. When you target more than one light, they coordinate so their colors stay related but not identical. The effect keeps running until you stop it.

{% include actions/ui_header.md %}

To run the color loop effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Color loop effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Set **Period** to control how long one full trip around the color wheel takes.
8. _Optional_: set **Spread** to control how different the colors of your lights are from each other, and **Minimum saturation** and **Maximum saturation** to control how vivid they get.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Brightness value:
  description: How bright the color loop is, from 0 to 255. Leave it out to keep each light's current brightness.
  required: false
Brightness:
  description: An alternative to the brightness value, as a percentage from 0 to 100. Use either this or the brightness value, not both.
  required: false
Minimum saturation:
  description: The lower bound for how vivid the colors are, as a percentage from 1 to 100. The effect uses the midpoint between the minimum and the maximum as a steady saturation, so lower values make the colors look paler. Defaults to 80.
  required: false
Maximum saturation:
  description: The upper bound for how vivid the colors are, as a percentage from 1 to 100. Higher values make the colors look more vivid. Defaults to 100.
  required: false
Transition:
  description: How long each light takes to fade from one color to the next, in seconds from 0 to 3600. Leave it out to fade over the whole step. A shorter fade makes the light change color, then hold it until the next step.
  required: false
Period:
  description: How long one full trip around the color wheel takes, in seconds. Accepts 0.05 to 3600 seconds. Shorter periods make the colors move faster. Defaults to 60 seconds.
  required: false
Change:
  description: How many degrees of the color wheel each step covers. Values below 1 are set to 1, and values above 179 are set to 179. Each light gets one color update per step, so smaller values give smoother changes and more network traffic. A step lasts the period times the change, divided by 360. Defaults to 20.
  required: false
Spread:
  description: How far apart the colors of your lights are, in degrees on a color wheel from 0 to 360. Each additional light is offset by this much. Use 0 to keep every light on the same color. Defaults to 30.
  required: false
Power on:
  description: Turn this off to skip lights that are currently off. When it's on, those lights are temporarily turned on for the effect. On by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_colorloop`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_colorloop
  target:
    entity_id: light.living_room
  data:
    brightness: 180
    period: 10
{% endexample %}

This loops colors across the living room lights at a fixed brightness, taking 10 seconds for each full trip around the color wheel.

### Options in YAML

{% options_yaml %}
brightness:
  description: >
    How bright the color loop is, from 0 to 255. Leave it out to keep each light's current brightness. Cannot be combined with `brightness_pct`.
  required: false
  type: integer
brightness_pct:
  description: >
    An alternative to `brightness`, as a percentage from 0 to 100. Cannot be combined with `brightness`.
  required: false
  type: float
saturation_min:
  description: >
    The lower bound for how vivid the colors are, as a percentage from 1 to 100. The effect uses the midpoint between the minimum and the maximum as a steady saturation, so lower values make the colors look paler.
  required: false
  type: integer
  default: 80
saturation_max:
  description: >
    The upper bound for how vivid the colors are, as a percentage from 1 to 100. Higher values make the colors look more vivid.
  required: false
  type: integer
  default: 100
transition:
  description: >
    How long each light takes to fade from one color to the next, in seconds from 0 to 3600. Leave it out to fade over the whole step. A shorter fade makes the light change color, then hold it until the next step.
  required: false
  type: float
period:
  description: >
    How long one full trip around the color wheel takes, in seconds. Accepts 0.05 to 3600 seconds, in steps of 0.05. Shorter periods make the colors move faster.
  required: false
  type: float
  default: 60
change:
  description: >
    How many degrees of the color wheel each step covers. Accepts 1 to 179 degrees. Each light gets one color update per step, so smaller values give smoother changes and more network traffic. A step lasts `period` times `change`, divided by 360.
  required: false
  type: float
  default: 20
spread:
  description: >
    How far apart the colors of your lights are, in degrees on a color wheel from 0 to 360. Each additional light is offset by this much. Use 0 to keep every light on the same color.
  required: false
  type: float
  default: 30
power_on:
  description: >
    Set to false to skip lights that are currently off. When true, those lights are temporarily turned on for the effect.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- This action only works on lights that belong to the LIFX {% term integration %}. When you target lights by entity and none of them is a LIFX light, Home Assistant reports an error: "The targets of action lifx.effect_colorloop include no LIFX light". When you target an area, floor, device, or label that holds no LIFX light, nothing happens and no error is returned.
- The effect needs color-capable lights. White-only LIFX lights can run [Pulse effect](/actions/lifx.effect_pulse/) instead.
- Color loop runs on LIFX lights connected over Thread. It sends each light one update per step instead of a stream of frames, so Thread lights can keep up with it.
- The color loop runs until something stops it. Use [Stop effect](/actions/lifx.effect_stop/) to end it, or turn the lights off.
- If you set the minimum saturation higher than the maximum, Home Assistant swaps the two values for you, so you only need to set one of them.
- Each time the effect starts, it picks a direction around the color wheel at random, so two runs of the same automation can move in opposite directions.
- Each light starts from the color it is showing when the effect starts, so the colors you see also depend on what the lights were doing beforehand.
- Because this is a software effect, Home Assistant sends each color change over your network. Each light gets one update per step and fades between steps on its own, so long periods and large changes use less network traffic than short ones.
- Starting a color loop replaces a software effect that's already running on the same light, such as [Pulse effect](/actions/lifx.effect_pulse/). It doesn't clear a firmware effect such as Move, Flame, Morph, or Sky, so run [Stop effect](/actions/lifx.effect_stop/) first if one of those is running.
- On multizone and matrix lights, the firmware effects [Move effect](/actions/lifx.effect_move/) and [Morph effect](/actions/lifx.effect_morph/) run on the light itself and stay smooth even if Home Assistant restarts.
- You can also start this effect with its default options from the regular [`light.turn_on`](/actions/light.turn_on/) action by setting its effect to `effect_colorloop`. Use this dedicated action when you want to control the speed, colors, or brightness.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start a slow color loop at sunset

At sunset, start a slow, gentle color loop in the living room, and stop it again at 11 pm.

- **Trigger**: Sunset
- **Action**: Color loop effect
  - **Target**: Living room lights (`light.living_room`)

{% example %}
automation: |
  alias: "Color loop in the living room after sunset"
  triggers:
    - trigger: sun
      event: sunset
      id: "start"
    - trigger: time
      at: "23:00:00"
      id: "stop"
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: "start"
          sequence:
            - action: lifx.effect_colorloop
              target:
                entity_id: light.living_room
              data:
                brightness_pct: 60
                period: 120
        - conditions:
            - condition: trigger
              id: "stop"
          sequence:
            - action: lifx.effect_stop
              target:
                entity_id: light.living_room
{% endexample %}

### Automation: celebrate when someone gets home

When you arrive home, run a fast color loop in the hallway for 30 seconds, then stop it.

- **Trigger**: Person arrives home (`person.paulus`)
- **Action**: Color loop effect
  - **Target**: Hallway light (`light.hallway`)
- **Action**: Stop effect
  - **Target**: Hallway light (`light.hallway`)

{% example %}
automation: |
  alias: "Welcome home color loop"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: "home"
  actions:
    - action: lifx.effect_colorloop
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 80
        period: 2
    - delay: "00:00:30"
    - action: lifx.effect_stop
      target:
        entity_id: light.hallway
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
