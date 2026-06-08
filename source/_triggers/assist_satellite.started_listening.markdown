---
title: Satellite started listening
trigger: assist_satellite.started_listening
domain: assist_satellite
description: Triggers after one or more Assist satellites start listening for a voice command.
related_triggers:
  - assist_satellite.started_processing
  - assist_satellite.started_responding
  - assist_satellite.idle
---

The **Satellite started listening** trigger fires when one or more Assist satellite {% term entities %} transition to the listening state. This happens immediately after the wake word is detected and the satellite opens its microphone to capture the voice command.

Use it to automate actions at the moment a voice interaction begins. For example, create an automation to switch on indicator lights that show the satellite is actively listening, to pause media playback so the satellite can hear the command clearly, or to log the time of each voice session for energy-use auditing.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Satellite started listening**.
5. Select **Add target** and pick the Assist satellite you want to watch. You can also select an area, a floor, a device, or a label, as described in [Targets](#targets).
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, you can set how long the satellite must keep reporting the listening state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted satellite starts listening.
    - **First**: fires only when the first satellite in the group starts listening.
    - **All**: fires only after every targeted satellite is in the listening state.
  required: false
For at least:
  description: How long the satellite or satellites must keep reporting the listening state before the trigger fires. The default is zero (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `assist_satellite.started_listening`. A basic example looks like this:

{% example %}
trigger: |
  trigger: assist_satellite.started_listening
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This fires every time `assist_satellite.living_room` starts listening for a voice command.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted satellite starts listening.
    - `first`: fires only when the first satellite starts listening.
    - `all`: fires only after every targeted satellite is in the listening state.
  required: false
  type: string
  default: each
for:
  description: |
    How long the satellite or satellites must keep reporting the listening state before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires as soon as the wake word is confirmed and the satellite enters the `listening` state. It does not wait for the voice command to be spoken or processed.
- If a satellite supports streaming wake word detection, it transitions from `idle` directly to `listening` without an intermediate step.
- If the satellite is already in the `listening` state when Home Assistant restarts, the trigger will not fire again until the state cycles back through `idle` first.
- Use the **For at least** option with caution. Listening windows are typically short (a few seconds), so long durations may prevent the trigger from ever firing under normal conditions.
- Satellites that have the `unavailable` or `unknown` state are skipped in the evaluation of multi-target behavior.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: pause media playback when any satellite starts listening to save energy

When a satellite starts listening, this automation pauses active media players in the same area. This prevents the satellite from picking up audio from speakers as speech and this way it reduces failed recognitions, unnecessary retries, and the associated network and compute energy use.

- **Trigger**: Satellite started listening
  - **Target**: All Assist satellites of living room (by label)
- **Action**: Pause media
  - **Target**: Living room media player

{% details "YAML example for pausing media when a satellite starts listening" %}

{% example %}
automation: |
  alias: "Pause media when a satellite starts listening"
  triggers:
    - trigger: assist_satellite.started_listening
      target:
        label_id: assist_satellites_living_room
  actions:
    - action: media_player.media_pause
      target:
        entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
