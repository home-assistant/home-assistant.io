---
title: "Seek by"
action: channels.seek_by
domain: channels
description: "Seeks forward or backward by a number of seconds."
related_actions:
  - channels.seek_forward
  - channels.seek_backward
---

Use this action to jump forward or backward in what is currently playing on a Channels app by a number of seconds that you choose. A positive value seeks forward, and a negative value seeks backward.

{% include actions/ui_header.md %}

To seek by a number of seconds from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Channels media player you want to control.
6. From the actions shown for that target, select **Seek by**.
7. Set **Seconds** to the number of seconds you want to seek by.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Seconds:
  description: The number of seconds to seek by. Use a negative value to seek backward.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `channels.seek_by`. A basic example looks like this:

{% example %}
action: |
  action: channels.seek_by
  target:
    entity_id: media_player.family_room_channels
  data:
    seconds: 30
{% endexample %}

This seeks 30 seconds forward on `media_player.family_room_channels`. To seek backward, use a negative value such as `-30`.

### Options in YAML

{% options_yaml %}
seconds:
  description: The number of seconds to seek by. Use a negative value to seek backward.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
