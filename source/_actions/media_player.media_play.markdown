---
title: "Play media"
action: media_player.media_play
domain: media_player
description: "Starts playback on a media player."
related_actions:
  - media_player.media_pause
  - media_player.media_stop
  - media_player.media_play_pause
  - media_player.play_media
---

Use this action to start or resume playback on a media player.

{% include actions/ui_header.md %}

To start playback from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Play media**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.media_play`. A basic example looks like this:

{% example %}
action: |
  action: media_player.media_play
  target:
    entity_id: media_player.living_room
{% endexample %}

This resumes playback on `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action resumes whatever was loaded on the media player. To start specific content, use [Play media](/actions/media_player.play_media/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resume playback when you sit down

Resume playback on a media player when a trigger fires, for example when motion is detected on the couch.

- **Trigger**: Motion detected
- **Action**: Play media
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Resume playback when motion is detected"
    triggers:
      - trigger: state
        entity_id: binary_sensor.couch_motion
        to: "on"
    actions:
      - action: media_player.media_play
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
