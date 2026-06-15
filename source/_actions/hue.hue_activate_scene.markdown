---
title: "Activate scene"
action: hue.hue_activate_scene
domain: hue
description: "Activates a Hue scene by its group and scene name as stored in the Hue app."
related_actions:
  - hue.activate_scene
---

Use this action to activate a Hue scene by typing its group (room) name and scene name exactly as they appear in the Hue app. This is mainly useful on legacy V1 Hue bridges (round shape), where scene entities are not created automatically, so the standard [scene action](/integrations/scene/) and the [Activate Hue scene](/actions/hue.activate_scene/) action are not available.

On a V2 bridge (square shape), use the [Activate Hue scene](/actions/hue.activate_scene/) action instead, as it targets scene entities directly and offers more options.

{% include actions/ui_header.md %}

To activate a scene by name from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Activate scene**.
6. Set **Group** to the room name and **Scene** to the scene name, both exactly as they appear in the Hue app.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Group:
  description: The name of the Hue group or room, exactly as it appears in the Hue app.
Scene:
  description: The name of the Hue scene, exactly as it appears in the Hue app.
Dynamic:
  description: Start the scene's dynamic color palette. This works on V2 bridges with scenes that support it.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hue.hue_activate_scene`. A basic example looks like this:

{% example %}
action: |
  action: hue.hue_activate_scene
  data:
    group_name: "Living room"
    scene_name: "Energize"
{% endexample %}

### Options in YAML

{% options_yaml %}
group_name:
  description: The name of the Hue group or room, exactly as it appears in the Hue app.
  required: true
  type: string
scene_name:
  description: The name of the Hue scene, exactly as it appears in the Hue app.
  required: true
  type: string
transition:
  description: How long, in seconds, the lights take to reach the scene's state.
  required: false
  type: integer
dynamic:
  description: Start the scene's dynamic color palette. This works on V2 bridges with scenes that support it.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- The group and scene names must match the names in the Hue app exactly, including capitalization.
- If no bridge can activate the scene, the action does nothing and a warning is logged. Double-check the names if a scene does not activate.

{% include actions/stuck.md %}

{% include actions/related.md %}
