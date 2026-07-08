---
title: "Play/Pause media"
action: media_player.media_play_pause
domain: media_player
description: "Toggles play and pause on a media player."
related_actions:
  - media_player.media_play
  - media_player.media_pause
  - media_player.media_stop
---

Use this action to toggle a media player between playing and paused.

{% include actions/ui_header.md %}

To toggle play and pause from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Play/Pause media**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.media_play_pause`. A basic example looks like this:

{% example %}
action: |
  action: media_player.media_play_pause
  target:
    entity_id: media_player.living_room
{% endexample %}

This toggles `media_player.living_room` between playing and paused.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support both playing and pausing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: play or pause with a button

Toggle playback each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Play/Pause media
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Play or pause with a button"
    triggers:
      - trigger: state
        entity_id: input_button.play_pause
    actions:
      - action: media_player.media_play_pause
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
