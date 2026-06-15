---
title: Set state
action: lifx.set_state
domain: lifx
description: "Change the color, brightness, and power of a LIFX light in a single step."
related_actions:
  - lifx.set_hev_cycle_state
  - lifx.paint_theme
---

Use this action to set the color and brightness of a LIFX light, optionally turning it on or off at the same time. Unlike the regular [`light.turn_on`](/actions/light.turn_on/) action, which always powers the light on, this action can change the color and brightness without affecting the current power state. That makes it handy for preparing a light's settings while it is off, so it looks right the moment something turns it on, like a motion sensor or a button.

{% include actions/ui_header.md %}

To set the state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX lights you want to change.
6. From the actions shown for that target, select **Set state**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Power:
  description: Turn the light on or off. Leave this out to keep the power as it is.
Transition:
  description: The duration, in seconds, it takes to get to the final state.
Zones:
  description: A list of zone numbers to affect on multizone lights, such as the LIFX Z, Lightstrip, and Beam. Zones start counting at 0.
Infrared:
  description: The automatic infrared level to use when the light brightness is low, for LIFX Nightvision bulbs.
{% endoptions_ui %}

You can also use the color and brightness options from the [`light.turn_on`](/actions/light.turn_on/) action, such as `color_name` or `brightness`, to set the new state.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.set_state`. A basic example looks like this:

{% example %}
action: |
  action: lifx.set_state
  target:
    entity_id: light.living_room
  data:
    color_name: blue
    brightness: 120
    transition: 2
{% endexample %}

This fades the light to blue at a brightness of 120 over two seconds.

### Options in YAML

{% options_yaml %}
power:
  description: Turn the light on or off. Leave this out to keep the power as it is.
  required: false
  type: boolean
  default: false
transition:
  description: The duration, in seconds, it takes to get to the final state.
  required: false
  type: float
zones:
  description: A list of zone numbers to affect on multizone lights, such as the LIFX Z, Lightstrip, and Beam. Zones start counting at 0.
  required: false
  type: list
infrared:
  description: The automatic infrared level (0 to 255) to use when the light brightness is low, for LIFX Nightvision bulbs.
  required: false
  type: integer
{% endoptions_yaml %}

You can also use the color and brightness options from the [`light.turn_on`](/actions/light.turn_on/) action, such as `color_name` or `brightness`, to set the new state.

## Good to know

- The LIFX Z and Lightstrip have 8 zones per segment, up to 10 segments, for a maximum of 80 zones (numbered 0 to 79). The LIFX Beam has 10 zones per segment plus 1 per corner piece, up to 8 segments and 2 corners, for a maximum of 82 zones (numbered 0 to 81).

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
