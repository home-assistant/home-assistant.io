---
title: "Snapshot"
action: snapcast.snapshot
domain: snapcast
description: "Takes a snapshot of what is currently playing on one or more Snapcast speakers."
related_actions:
  - snapcast.restore
  - snapcast.set_latency
---

The **Snapshot** action saves the current playback state of one or more Snapcast speakers, so you can return to it later with [Restore](/actions/snapcast.restore/).

This pair is handy when you want to interrupt playback for a doorbell or a notification sound and then pick up right where you left off.

{% include actions/ui_header.md %}

To take a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Snapcast speakers you want to snapshot.
6. From the actions shown for that target, select **Snapshot**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `snapcast.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: snapcast.snapshot
  target:
    entity_id: media_player.snapcast_living_room
{% endexample %}

This saves the current playback state of the selected speaker.

### Options in YAML

This action has no additional options in YAML.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause for a doorbell and resume afterwards

When the doorbell rings, snapshot the speakers, play a chime, then restore playback.

- **Trigger**: The doorbell button is pressed
- **Action**: Snapcast: Snapshot, play the chime, then Snapcast: Restore

{% details "YAML example for snapshot and restore around a doorbell chime" %}

{% example %}
automation: |
  alias: "Doorbell chime with resume"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: snapcast.snapshot
      target:
        entity_id: media_player.snapcast_living_room
    - action: media_player.play_media
      target:
        entity_id: media_player.snapcast_living_room
      data:
        media_content_id: "media-source://media_source/local/doorbell.mp3"
        media_content_type: music
    - delay: "00:00:10"
    - action: snapcast.restore
      target:
        entity_id: media_player.snapcast_living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
