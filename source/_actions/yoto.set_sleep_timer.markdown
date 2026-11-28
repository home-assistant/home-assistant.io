---
title: "Set sleep timer"
action: yoto.set_sleep_timer
domain: yoto
description: "Stops playback on a Yoto player after a set amount of time or at the end of the current track."
related_actions:
  - yoto.clear_sleep_timer
---

Use this action to stop playback on a Yoto player after a set amount of time, or when the current track ends. This is handy at bedtime, for example to let a story play for 30 minutes and then stop on its own. Setting a new timer replaces the one already running.

{% include actions/ui_header.md %}

To set a Yoto sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yoto player you want to set a timer for. You can also select an area, a device, or a label.
6. From the actions shown for that target, under **Yoto**, select **Set sleep timer**.
7. Choose a **Mode**. With **Duration**, also set how long the player keeps playing.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "**Duration** stops playback after a set amount of time. **End of current track** stops playback when the current track ends."
Duration:
  description: How long the player keeps playing before it stops. Only shown when the mode is **Duration**.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yoto.set_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: yoto.set_sleep_timer
  target:
    entity_id: media_player.yoto_player
  data:
    duration:
      minutes: 30
{% endexample %}

To stop at the end of the current track instead:

{% example %}
action: |
  action: yoto.set_sleep_timer
  target:
    entity_id: media_player.yoto_player
  data:
    mode: end_of_track
{% endexample %}

### Options in YAML

{% options_yaml %}
mode:
  description: "`duration` stops playback after `duration`. `end_of_track` stops playback when the current track ends."
  required: false
  default: duration
  type: string
duration:
  description: "How long the player keeps playing before it stops, for example `00:30:00`. Required when `mode` is `duration`, not allowed with `end_of_track`."
  required: false
  type: time
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The end of track mode only works while a track is loaded on the player.
- The player only receives a number of seconds. In end of track mode, the timer is calculated once from the time left in the current track. Seeking or changing tracks afterwards does not update it.
- The **Sleep timer** sensor of the player shows when the running timer stops playback.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop the story 30 minutes after bedtime playback starts

At bedtime, a story can play for a while and then stop on its own. This automation sets a 30-minute sleep timer when the player starts playing after 7 PM.

- **Trigger**: Entity state: Yoto player changes to **Playing**
- **Condition**: Time: after 19:00
- **Action**: Yoto set sleep timer
  - **Target**: Yoto player
  - **Mode**: Duration
  - **Duration**: `00:30:00`

{% details "YAML example for a bedtime sleep timer" %}

{% example %}
automation: |
  alias: "Stop the story 30 minutes after bedtime playback starts"
  triggers:
    - trigger: state
      entity_id: media_player.yoto_player
      to: "playing"
  conditions:
    - condition: time
      after: "19:00:00"
  actions:
    - action: yoto.set_sleep_timer
      target:
        entity_id: media_player.yoto_player
      data:
        mode: duration
        duration:
          minutes: 30
{% endexample %}

{% enddetails %}

### Automation: let the current track finish at lights out

At lights out, the current track can finish instead of stopping in the middle. This automation stops playback at the end of the current track at 8:30 PM.

- **Trigger**: Time: 20:30
- **Action**: Yoto set sleep timer
  - **Target**: Yoto player
  - **Mode**: End of current track

{% details "YAML example for stopping at the end of the track" %}

{% example %}
automation: |
  alias: "Let the current track finish at lights out"
  triggers:
    - trigger: time
      at: "20:30:00"
  actions:
    - action: yoto.set_sleep_timer
      target:
        entity_id: media_player.yoto_player
      data:
        mode: end_of_track
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
