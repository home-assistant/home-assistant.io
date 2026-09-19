---
title: Pulse effect
action: lifx.effect_pulse
domain: lifx
description: "Run a software-based flash effect on LIFX lights by changing to a color and back."
related_actions:
  - lifx.effect_colorloop
  - lifx.effect_stop
---

Use this action to run a software-based flash effect on LIFX lights. The light changes to a color and then back to its original color, which is useful for getting your attention, like a notification flash.

You can start this effect with default options using the `effect` option of the regular [`light.turn_on`](/actions/light.turn_on/) action. To fully control the effect, use this dedicated action instead.

{% include actions/ui_header.md %}

To run the pulse effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX lights you want to flash.
6. From the actions shown for that target, select **Pulse effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "How colors change during the effect. One of: `blink` (direct switch to the new color), `breathe` (fade to the new color and back), `ping` (a short pulse of the new color), `strobe` (the light turns off between color changes), or `solid` (the light does not return to its original color between cycles)."
Brightness value:
  description: A number from 1 to 255 for how bright the temporary color should be.
Brightness:
  description: An alternative to the brightness value, as a percentage from 1 to 100.
Color name:
  description: A human-readable color name, such as `red` or `green`.
RGB color:
  description: The temporary color in RGB format, as a list of three integers.
Period:
  description: The duration of a single pulse, in seconds.
Cycles:
  description: The total number of pulses to run.
Power on:
  description: Turn this off to skip the effect on lights that are turned off.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_pulse`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_pulse
  target:
    entity_id: light.office
  data:
    color_name: red
    mode: breathe
    cycles: 3
{% endexample %}

This makes the office light breathe red three times before returning to its original color.

### Options in YAML

{% options_yaml %}
mode:
  description: "How colors change during the effect. One of: `blink` (direct switch to the new color), `breathe` (fade to the new color and back), `ping` (a short pulse of the new color), `strobe` (the light turns off between color changes), or `solid` (the light does not return to its original color between cycles)."
  required: false
  type: string
  default: blink
brightness:
  description: A number from 1 to 255 for how bright the temporary color should be.
  required: false
  type: integer
brightness_pct:
  description: An alternative to brightness, as a percentage from 1 to 100.
  required: false
  type: integer
color_name:
  description: A human-readable color name, such as `red` or `green`.
  required: false
  type: string
rgb_color:
  description: The temporary color in RGB format, as a list of three integers.
  required: false
  type: list
period:
  description: The duration of a single pulse, in seconds.
  required: false
  type: float
  default: 1.0
cycles:
  description: The total number of pulses to run.
  required: false
  type: integer
  default: 1
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
