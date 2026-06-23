---
title: Satellite became idle
trigger: assist_satellite.idle
domain: assist_satellite
description: Triggers after one or more Assist satellites return to the idle state.
related_triggers:
  - assist_satellite.started_listening
  - assist_satellite.started_processing
  - assist_satellite.started_responding
---

The **Satellite became idle** trigger fires when one or more Assist satellite {% term entities %} return to the idle state. This happens after a voice pipeline run is fully complete: the wake word was detected, the command was listened to, processed, and the spoken response has finished playing.

Use it to automate clean-up or reset actions after each voice interaction. For example, create an automation to restore media volume that was lowered during the response, to turn off indicator lights that were switched on when listening began, to resume a paused media player, or to log the end of each voice session as part of an energy and resource monitoring routine.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Satellite became idle**.
5. Select **Add target** and pick the Assist satellite you want to watch. You can also select an area, a floor, a device, or a label, as described in [Targets](#targets).
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, you can set how long the satellite must keep reporting the idle state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted satellite returns to idle.
    - **First**: fires only when the first satellite in the group returns to idle.
    - **All**: fires only after every targeted satellite is back in the idle state.
  required: false
For at least:
  description: How long the satellite or satellites must keep reporting the idle state before the trigger fires. The default is zero (fires immediately). Use a short duration such as five seconds to avoid triggering on momentary idle flickers between pipeline stages.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `assist_satellite.idle`. A basic example looks like this:

{% example %}
trigger: |
  trigger: assist_satellite.idle
  target:
    entity_id: assist_satellite.living_room
  options:
    for: "00:00:02"
{% endexample %}

This fires two seconds after `assist_satellite.living_room` returns to the idle state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted satellite returns to idle.
    - `first`: fires only when the first satellite returns to idle.
    - `all`: fires only after every targeted satellite is back in the idle state.
  required: false
  type: string
  default: each
for:
  description: |
    How long the satellite or satellites must keep reporting the idle state before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Home Assistant also fires this trigger on startup for satellites that are already in the idle state, as their state is loaded from storage. Use the **For at least** option to filter out these startup events if needed.
- You can also use the **For at least** option to add a small delay (for example, two to five seconds) before running follow-up actions. This avoids race conditions where an action fires before the satellite has fully settled. This is especially useful when restoring media playback.
- This trigger combined with the **Satellite started listening** trigger forms a natural bracket around a complete voice session, which is useful for logging session duration or computing the energy cost of each pipeline run.
- Satellites that have the **Unavailable** or **Unknown** state are skipped in the evaluation of multi-target behavior.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: resume paused media after the satellite finishes responding

When a satellite returns to idle after a voice interaction, this automation resumes any media player that was paused when listening began. This restores your listening session automatically, eliminating the need to manually restart playback and ensuring media player is not left paused, forgotten and consuming standby power.

- **Trigger**: Satellite became idle
  - **Target**: Living room Assist satellite
  - **For at least**: 00:00:02
- **Action**: Play media
  - **Target**: Living room speaker

{% details "YAML example for resuming media after the satellite returns to idle" %}

{% example %}
automation: |
  alias: "Resume media after satellite returns to idle"
  triggers:
    - trigger: assist_satellite.idle
      target:
        entity_id: assist_satellite.living_room
      options:
        for: "00:00:02"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room_speaker
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
