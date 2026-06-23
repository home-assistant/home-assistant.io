---
title: "Seek media"
action: media_player.media_seek
domain: media_player
description: "Jumps to a different position in the media currently playing."
related_actions:
  - media_player.media_play
  - media_player.media_pause
---

Use this action to jump to a different position in the media currently playing on a media player.

{% include actions/ui_header.md %}

To seek to a position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Seek media**.
7. Set the **Position** you want to jump to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: The target position in the currently playing media. The format is platform dependent, often in seconds from the start.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.media_seek`. A basic example looks like this:

{% example %}
action: |
  action: media_player.media_seek
  target:
    entity_id: media_player.living_room
  data:
    seek_position: 120
{% endexample %}

This jumps to 120 seconds into the media on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
seek_position:
  description: The target position in the currently playing media. The format is platform dependent, often in seconds from the start.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support seeking. The exact meaning of the position value depends on the media player.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: skip the intro with a button

Jump to a fixed position when you press a button, for example to skip past an intro.

- **Trigger**: Button is pressed
- **Action**: Seek media
  - **Target**: Living room TV
  - **Position**: 90

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Skip the intro with a button"
    triggers:
      - trigger: state
        entity_id: input_button.skip_intro
    actions:
      - action: media_player.media_seek
        target:
          entity_id: media_player.living_room
        data:
          seek_position: 90
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
