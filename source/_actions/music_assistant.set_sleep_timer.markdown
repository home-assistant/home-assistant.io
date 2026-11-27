---
title: "Set sleep timer"
action: music_assistant.set_sleep_timer
domain: music_assistant
description: "Stops playback on a Music Assistant player after a duration, or at the end of the current item or chapter."
related_actions:
  - music_assistant.clear_sleep_timer
  - music_assistant.play_media
---

Use this action to stop playback on a Music Assistant player later, for example when you fall asleep to an audiobook or a podcast. Playback stops after a duration you choose, or when the current item or chapter ends.

{% include actions/ui_header.md %}

To use this action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player that should stop playing.
6. From the actions shown for that target, under **Music Assistant**, select **Set sleep timer**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: When playback stops. **After a duration** stops when the duration has passed, **End of the current item** stops when the item playing now ends, and **End of the current chapter** stops when its chapter ends. An item without chapters stops at its end.
Duration:
  description: Time until playback stops, at least one second. Required for **After a duration**, and not allowed for the other modes.
Username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.set_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.set_sleep_timer
  target:
    entity_id: media_player.bedroom_speaker
  data:
    duration: "00:30:00"
{% endexample %}

This stops playback on the bedroom speaker in 30 minutes.

### Options in YAML

{% options_yaml %}
mode:
  description: "When playback stops: `duration` stops when the duration has passed, `end_of_item` stops when the item playing now ends, and `end_of_chapter` stops when its chapter ends. An item without chapters stops at its end."
  required: false
  type: string
  default: duration
duration:
  description: Time until playback stops, at least one second. Required for the `duration` mode, and not allowed for the other modes.
  required: false
  type: time
username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- A player has one sleep timer. Setting a new one replaces the running timer.
- A timer with a duration keeps running while playback is paused. A timer for the end of the item or chapter waits while playback is paused.
- The end of the item or chapter needs an item with a known length, playing from the player's queue. Radio streams don't have one.
- For a player that plays along with another player, the sleep timer stops the playback of that other player.
- The end of item and end of chapter modes, and running the action as a specific Music Assistant user, require Music Assistant server version 2.11 or later.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: stop at the end of the chapter

Fall asleep to an audiobook without losing your place: playback stops when the chapter you are listening to ends. Start the script from a dashboard button at bedtime.

- **Action**: Set sleep timer
  - **Target**: Bedroom speaker
  - **Mode**: End of the current chapter

{% details "YAML example for stopping at the end of the chapter" %}

{% example %}
script: |
  alias: "Stop the audiobook at the end of the chapter"
  sequence:
    - action: music_assistant.set_sleep_timer
      target:
        entity_id: media_player.bedroom_speaker
      data:
        mode: end_of_chapter
{% endexample %}

{% enddetails %}

### Automation: stop late-night music after 30 minutes

When music starts on the bedroom speaker late in the evening, stop it after 30 minutes, so it doesn't play all night.

- **Trigger**: Media player started playing
  - **Target**: Bedroom speaker
- **Condition**: Time
  - **After**: 22:00
  - **Before**: 05:00
- **Action**: Set sleep timer
  - **Target**: Bedroom speaker
  - **Duration**: 30 minutes

{% details "YAML example for stopping late-night music" %}

{% example %}
automation: |
  alias: "Stop late-night music after 30 minutes"
  triggers:
    - trigger: media_player.started_playing
      target:
        entity_id: media_player.bedroom_speaker
  conditions:
    - condition: time
      after: "22:00:00"
      before: "05:00:00"
  actions:
    - action: music_assistant.set_sleep_timer
      target:
        entity_id: media_player.bedroom_speaker
      data:
        duration: "00:30:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
