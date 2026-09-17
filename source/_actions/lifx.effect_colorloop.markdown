---
title: Color loop effect
action: lifx.effect_colorloop
domain: lifx
description: "Run a software-based effect on LIFX lights that loops colors around the color wheel."
related_actions:
  - lifx.effect_pulse
  - lifx.effect_stop
---

Use this action to run a software-based effect that continuously loops colors around the color wheel. When you target more than one light, they coordinate to keep similar, but not identical, colors.

You can start this effect with default options using the `effect` option of the regular [`light.turn_on`](/actions/light.turn_on/) action. To fully control the effect, use this dedicated action instead.

{% include actions/ui_header.md %}

To run the color loop effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX lights you want to loop.
6. From the actions shown for that target, select **Color loop effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Brightness value:
  description: A number from 1 to 255 for the brightness of the color loop. Leave it out to keep each light's current brightness.
Brightness:
  description: An alternative to the brightness value, as a percentage from 1 to 100.
Minimum saturation:
  description: A percentage from 1 to 100 for the minimum saturation of the colors in the loop.
Maximum saturation:
  description: A percentage from 1 to 100 for the maximum saturation of the colors in the loop.
Period:
  description: The duration, in seconds, between starting a new color change.
Transition:
  description: The duration, in seconds, where lights are actively changing color.
Change:
  description: The hue movement per period, in degrees on a color wheel (0 to 360).
Spread:
  description: The maximum hue difference between participating lights, in degrees on a color wheel (0 to 360).
Power on:
  description: Turn this off to skip the effect on lights that are turned off.
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
    spread: 30
    change: 35
{% endexample %}

This loops colors across the living room lights, changing every 10 seconds.

### Options in YAML

{% options_yaml %}
brightness:
  description: A number from 1 to 255 for the brightness of the color loop. Leave it out to keep each light's current brightness.
  required: false
  type: integer
brightness_pct:
  description: An alternative to brightness, as a percentage from 1 to 100.
  required: false
  type: integer
saturation_min:
  description: A percentage from 1 to 100 for the minimum saturation of the colors in the loop.
  required: false
  type: integer
  default: 80
saturation_max:
  description: A percentage from 1 to 100 for the maximum saturation of the colors in the loop.
  required: false
  type: integer
  default: 100
period:
  description: The duration, in seconds, between starting a new color change.
  required: false
  type: float
  default: 60
transition:
  description: The duration, in seconds, where lights are actively changing color.
  required: false
  type: float
change:
  description: The hue movement per period, in degrees on a color wheel (0 to 360).
  required: false
  type: integer
  default: 20
spread:
  description: The maximum hue difference between participating lights, in degrees on a color wheel (0 to 360).
  required: false
  type: integer
  default: 30
power_on:
  description: Set to false to skip the effect on lights that are turned off.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
