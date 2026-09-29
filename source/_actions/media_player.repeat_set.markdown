---
title: "Set media player repeat"
action: media_player.repeat_set
domain: media_player
description: "Sets the repeat mode of a media player."
related_actions:
  - media_player.shuffle_set
  - media_player.media_next_track
  - media_player.media_previous_track
---

Use this action to set the repeat mode of a media player, for example to repeat a single track or a whole playlist.

{% include actions/ui_header.md %}

To set the repeat mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Set media player repeat**.
7. Set the **Repeat mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Repeat mode:
  description: The repeat mode to set, either off, all to loop the whole queue, or one to loop the current track.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.repeat_set`. A basic example looks like this:

{% example %}
action: |
  action: media_player.repeat_set
  target:
    entity_id: media_player.living_room
  data:
    repeat: all
{% endexample %}

This loops the whole queue on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat mode to set, either off, all to loop the whole queue, or one to loop the current track.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The repeat mode can be `off`, `all` to loop the whole queue, or `one` to loop the current track.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: loop a playlist during a workout

Set a media player to repeat when a trigger fires, for example to keep music going during a workout.

- **Trigger**: Workout starts
- **Action**: Set media player repeat
  - **Target**: Gym speaker
  - **Repeat mode**: all

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Loop a playlist during a workout"
    triggers:
      - trigger: state
        entity_id: input_boolean.workout
        to: "on"
    actions:
      - action: media_player.repeat_set
        target:
          entity_id: media_player.gym
        data:
          repeat: all
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
