---
title: "Seek backward"
action: channels.seek_backward
domain: channels
description: "Seeks backward by the number of seconds set in the Channels app."
related_actions:
  - channels.seek_forward
  - channels.seek_by
---

Use this action to jump backward in what is currently playing on a Channels app. The amount of time it seeks is the number of seconds set in the settings on that instance of Channels.

{% include actions/ui_header.md %}

To seek backward from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Channels media player you want to control.
6. From the actions shown for that target, select **Seek backward**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `channels.seek_backward`. A basic example looks like this:

{% example %}
action: |
  action: channels.seek_backward
  target:
    entity_id: media_player.family_room_channels
{% endexample %}

This seeks backward on `media_player.family_room_channels`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
