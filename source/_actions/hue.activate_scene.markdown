---
title: "Activate Hue scene"
action: hue.activate_scene
domain: hue
description: "Activates a Hue scene with extra control over options like dynamic mode and brightness."
related_actions:
  - hue.hue_activate_scene
---

Use this action to activate a Hue scene with more control than the standard scene action gives you. On top of turning the scene on, you can start its dynamic color palette, set how fast that palette cycles, adjust the brightness, and choose how long the lights take to transition. A common use is to start a slow, dynamic scene in the evening and switch to a brighter static scene in the morning.

This action targets the Hue scene {% term entity %} you want to activate. These scene entities are created automatically from the scenes you set up in the Hue app.

{% include actions/ui_header.md %}

To activate a Hue scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Hue scene you want to activate.
6. From the actions shown for that target, select **Activate Hue scene**.
7. Optionally, set the transition, dynamic mode, speed, and brightness.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition:
  description: How long, in seconds, the lights take to reach the scene's state.
  required: false
Dynamic:
  description: Start the scene's dynamic color palette, where the scene supports it.
  required: false
Speed:
  description: How fast the dynamic color palette cycles.
  required: false
Brightness:
  description: The brightness to apply to the scene.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hue.activate_scene`. A basic example looks like this:

{% example %}
action: |
  action: hue.activate_scene
  target:
    entity_id: scene.living_room_energize
{% endexample %}

This activates the `scene.living_room_energize` Hue scene.

### Options in YAML

{% options_yaml %}
transition:
  description: How long, in seconds, the lights take to reach the scene's state.
  required: false
  type: integer
dynamic:
  description: Start the scene's dynamic color palette, where the scene supports it.
  required: false
  type: boolean
  default: false
speed:
  description: How fast the dynamic color palette cycles, from 0 to 100.
  required: false
  type: integer
brightness:
  description: The brightness to apply to the scene, from 1 to 255.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="scene" %}

## Good to know

- Dynamic mode and speed only have an effect on scenes that support a dynamic color palette.
- Use this action when you need the extra options. To simply turn a scene on, the standard [scene action](/integrations/scene/) is enough.

{% include actions/stuck.md %}

{% include actions/related.md %}
