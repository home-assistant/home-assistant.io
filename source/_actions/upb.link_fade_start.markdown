---
title: "Start link fade"
action: upb.link_fade_start
domain: upb
description: "Starts fading a UPB scene up or down to a target brightness."
related_actions:
  - upb.link_fade_stop
  - upb.link_goto
  - upb.link_deactivate
---

Use this action to start fading a UPB scene up or down from its current brightness to a target level. Lights within the scene that are not dimmable ignore the fade.

{% include actions/ui_header.md %}

To start a scene fade from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your UPB scene.
6. From the actions shown for that target, select **Start link fade**.
7. Enter the target brightness and the rate, then select **Save**.

### Options in the UI

{% options_ui %}
Brightness:
  description: The target brightness, where 0 turns the scene off, 1 is the minimum brightness, and 255 is the maximum brightness. Set either Brightness or Brightness percentage, but not both.
  required: false
Brightness percentage:
  description: The target brightness as a percentage, where 0 turns the scene off, 1 is the minimum brightness, and 100 is the maximum brightness. Set either Brightness or Brightness percentage, but not both.
  required: false
Rate:
  description: The time in seconds for the scene to transition to the new brightness. The UPB system rounds this to the nearest supported time. See [Rate transition time](/integrations/upb/#rate-transition-time) for how this value is interpreted. A value of -1 uses the device default rate.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `upb.link_fade_start`. A basic example looks like this:

{% example %}
action: |
  action: upb.link_fade_start
  target:
    entity_id: scene.interior_lights
  data:
    brightness_pct: 75
    rate: 10
{% endexample %}

### Options in YAML

{% options_yaml %}
brightness:
  description: >
    The target brightness, where 0 turns the scene off, 1 is the minimum
    brightness, and 255 is the maximum brightness. Set either `brightness` or
    `brightness_pct`, but not both.
  required: false
  type: integer
brightness_pct:
  description: >
    The target brightness as a percentage, where 0 turns the scene off, 1 is
    the minimum brightness, and 100 is the maximum brightness. Set either
    `brightness` or `brightness_pct`, but not both.
  required: false
  type: float
rate:
  description: >
    The time in seconds for the scene to transition to the new brightness. The
    UPB system rounds this to the nearest supported time. See
    [Rate transition time](/integrations/upb/#rate-transition-time) for how
    this value is interpreted. A value of -1 uses the device default rate.
  required: false
  type: float
  default: -1
{% endoptions_yaml %}

{% include actions/targets.md domain="scene" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
