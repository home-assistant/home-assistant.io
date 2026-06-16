---
title: "Play the Sonos queue"
action: sonos.play_queue
domain: sonos
description: "Starts playing the Sonos queue, optionally from a specific position."
related_actions:
  - sonos.get_queue
  - sonos.remove_from_queue
---

Use this action to start playing the Sonos queue. It forces playback of the queue, which lets you switch back from another source, such as radio, to the queue. You can optionally start from a specific position in the queue.

{% include actions/ui_header.md %}

To play the Sonos queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker you want to play the queue on. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Play queue**.
7. Optionally, set the **Queue position** to start from.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Queue position:
  description: The position in the queue to start playing from. The first item is 0.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.play_queue`. A basic example looks like this:

{% example %}
action: |
  action: sonos.play_queue
  target:
    entity_id: media_player.living_room
{% endexample %}

### Options in YAML

{% options_yaml %}
queue_position:
  description: The position in the queue to start playing from. The first item is 0.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- When targeting a group, use the coordinator speaker.

{% include actions/stuck.md %}

{% include actions/related.md %}
