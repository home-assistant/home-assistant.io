---
title: "Flash"
action: hue.flash
domain: hue
description: "Flashes a Hue light, room, or zone, without changing the state reported to Home Assistant."
related_actions:
  - hue.stop_flash
  - light.turn_on
---

Use this action to flash Hue lights to get your attention, for example, when the doorbell rings, when a timer ends, or when your team scores. The lights can flash on and off, flash in a color you choose, or alternate between two colors. When the flash ends, the lights return to their previous state.

Flashing does not change the state of the light reported to Home Assistant. A light that was off continues to report off in Home Assistant while it flashes, and a light that was on keeps reporting the same brightness and color. This means that a flash does not interfere with automations that react to state changes of your lights.

This action targets Hue light {% term entities %}, including the lights for Hue rooms and zones. When you target a room or zone, the Hue bridge flashes all of its lights at the same time so the effect is perfectly synchronized.

{% note %}
This action is only available for lights connected to a V2 Hue bridge (square shape).
{% endnote %}

{% include actions/ui_header.md %}

To flash a Hue light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Hue light, room, or zone you want to flash.
6. From the actions shown for that target, select **Flash**.
7. Set the duration and, optionally, one or two colors.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the light flashes, from 1 second to 18 hours.
  required: true
Color:
  description: The color to flash in.
  required: false
Second color:
  description: A second color, to alternate between the two colors. You can only use this together with **Color**.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hue.flash`. A basic example looks like this:

{% example %}
action: |
  action: hue.flash
  target:
    entity_id: light.living_room
  data:
    duration: 5
    rgb_color: [255, 0, 0]
{% endexample %}

This flashes the `light.living_room` Hue room in red for 5 seconds.

To alternate between two colors:

{% example %}
action: |
  action: hue.flash
  target:
    entity_id: light.living_room
  data:
    duration: 10
    rgb_color: [255, 0, 0]
    second_rgb_color: [0, 0, 255]
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: How long the light flashes, from 1 second to 18 hours. Use a number of seconds, such as `5`, or a time, such as `"00:01:30"`.
  required: true
  type: time
rgb_color:
  description: The color to flash, as a list of three numbers from 0 to 255.
  required: false
  type: list
second_rgb_color:
  description: A second color, to alternate between the two colors, as a list of three numbers from 0 to 255. You can only use this together with `rgb_color`.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Not every Hue light can flash in a color. Lights without color, as well as some older color lights, can only flash on and off. Targets that do not support what you asked for are skipped. If none of the targets support the action, it will fail with a descriptive message.
- When you target a Hue room or zone, any lights that cannot flash in a color will flash on and off instead.
- To end a flash before its duration has passed, use the [Stop flash](/actions/hue.stop_flash/) action.
- Use this action instead of the **Flash** option of the [light turn on action](/actions/light.turn_on/) when you want to flash in a color, choose how long the flash lasts, keep the lights of a room or zone in sync, or leave the state of the light reported to Home Assistant untouched.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
