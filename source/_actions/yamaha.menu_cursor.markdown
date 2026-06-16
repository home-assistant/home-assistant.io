---
title: "Yamaha: Menu cursor"
action: yamaha.menu_cursor
domain: yamaha
description: "Controls the on-screen menu cursor of a Yamaha receiver."
related_actions:
  - yamaha.enable_output
  - yamaha.select_scene
---

Use this action to move the on-screen menu cursor of a Yamaha receiver, or to confirm or go back, by pressing one of the cursor keys.

{% include actions/ui_header.md %}

To control the menu cursor from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the receiver you want to control.
6. From the actions shown for that target, select **Yamaha: Menu cursor**.
7. Set the **Cursor** key to press.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Cursor:
  description: "The cursor key to press: `up`, `down`, `left`, `right`, `select`, or `return`."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yamaha.menu_cursor`. A basic example looks like this:

{% example %}
action: |
  action: yamaha.menu_cursor
  target:
    entity_id: media_player.living_room_stereo
  data:
    cursor: down
{% endexample %}

This presses the down cursor key on `media_player.living_room_stereo`.

### Options in YAML

{% options_yaml %}
cursor:
  description: "The cursor key to press: `up`, `down`, `left`, `right`, `select`, or `return`."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
