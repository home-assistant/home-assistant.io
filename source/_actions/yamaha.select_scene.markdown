---
title: "Yamaha: Select scene"
action: yamaha.select_scene
domain: yamaha
description: "Selects a scene on a Yamaha receiver."
related_actions:
  - yamaha.enable_output
  - yamaha.menu_cursor
---

Use this action to select one of the scenes configured on a Yamaha receiver, such as a scene for movie viewing or radio listening.

{% include actions/ui_header.md %}

To select a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the receiver you want to control.
6. From the actions shown for that target, select **Yamaha: Select scene**.
7. Set the **Scene** to select.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Scene:
  description: The name of the scene to select, for example `TV Viewing`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yamaha.select_scene`. A basic example looks like this:

{% example %}
action: |
  action: yamaha.select_scene
  target:
    entity_id: media_player.living_room_stereo
  data:
    scene: "TV Viewing"
{% endexample %}

This selects the `TV Viewing` scene on `media_player.living_room_stereo`.

### Options in YAML

{% options_yaml %}
scene:
  description: The name of the scene to select, for example `TV Viewing`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
