---
title: "Restore a Sonos snapshot"
action: sonos.restore
domain: sonos
description: "Restores a previously taken snapshot on one or more Sonos speakers."
related_actions:
  - sonos.snapshot
---

Use this action to restore a snapshot you previously saved with the [Take a Sonos snapshot](/actions/sonos.snapshot/) action. Together, these two actions let you interrupt playback, for example to play a doorbell sound or a notification, and then resume what was playing.

{% note %}
The queue is not part of the snapshot. If the speaker's queue was replaced after the snapshot was taken, restoring brings back the playing position, but within the new queue.
{% endnote %}

{% note %}
A cloud queue cannot be restarted. This includes queues started from within Spotify and queues controlled by Amazon Alexa.
{% endnote %}

{% include actions/ui_header.md %}

To restore a Sonos snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speakers you want to restore. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Restore**.
7. Optionally, turn off **With group** if you only want to restore the selected speakers.
8. Select **Save**.

### Options in the UI

{% options_ui %}
With group:
  description: Also restore the group layout and the state of other speakers in the group. Enabled by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.restore`. A basic example looks like this:

{% example %}
action: |
  action: sonos.restore
  target:
    entity_id: media_player.living_room
{% endexample %}

### Options in YAML

{% options_yaml %}
with_group:
  description: Also restore the group layout and the state of other speakers in the group.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/stuck.md %}

{% include actions/related.md %}
