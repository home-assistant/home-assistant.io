---
title: "Take a Sonos snapshot"
action: sonos.snapshot
domain: sonos
description: "Saves what is currently playing on one or more Sonos speakers so you can restore it later."
related_actions:
  - sonos.restore
---

Use this action to save what is currently playing on one or more Sonos speakers. You can restore it later with the [Restore a Sonos snapshot](/actions/sonos.restore/) action. This is handy when you want to interrupt playback to play a doorbell sound or a notification, then pick up right where you left off.

{% note %}
The queue is not part of the snapshot and must be left untouched until you restore. Playing a notification sound with the [Play media](/integrations/media_player/#action-media_playerplay_media) action, including [text-to-speech](/integrations/tts/) announcements, is safe.
{% endnote %}

{% include actions/ui_header.md %}

To take a Sonos snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speakers you want to snapshot.
6. From the actions shown for that target, select **Snapshot**.
7. Optionally, turn off **With group** if you only want to snapshot the selected speakers.
8. Select **Save**.

### Options in the UI

{% options_ui %}
With group:
  description: Also snapshot the group layout and the state of other speakers in the group. Enabled by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: sonos.snapshot
  target:
    entity_id: media_player.living_room
{% endexample %}

### Options in YAML

{% options_yaml %}
with_group:
  description: Also snapshot the group layout and the state of other speakers in the group.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- A cloud queue cannot be restarted from a snapshot. This includes queues started from within Spotify and queues controlled by Amazon Alexa.

{% include actions/stuck.md %}

{% include actions/related.md %}
