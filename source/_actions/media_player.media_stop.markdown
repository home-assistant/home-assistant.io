---
title: "Stop media"
action: media_player.media_stop
domain: media_player
description: "Stops playback on a media player."
related_actions:
  - media_player.media_play
  - media_player.media_pause
  - media_player.clear_playlist
---

Use this action to stop playback on a media player.

{% include actions/ui_header.md %}

To stop playback from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Stop media**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.media_stop`. A basic example looks like this:

{% example %}
action: |
  action: media_player.media_stop
  target:
    entity_id: media_player.living_room
{% endexample %}

This stops playback on `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support stopping.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop playback at bedtime

Stop a media player at a set time, for example to make sure music stops when you go to sleep.

- **Trigger**: Time: 00:00
- **Action**: Stop media
  - **Target**: Bedroom speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop playback at bedtime"
    triggers:
      - trigger: time
        at: "00:00:00"
    actions:
      - action: media_player.media_stop
        target:
          entity_id: media_player.bedroom
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
