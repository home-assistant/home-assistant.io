---
title: "Satellite is listening"
condition: assist_satellite.is_listening
domain: assist_satellite
description: "Tests if one or more Assist satellites are listening for a voice command."
related_conditions:
  - assist_satellite.is_idle
  - assist_satellite.is_processing
  - assist_satellite.is_responding
---

The **Satellite is listening** condition passes when a targeted Assist satellite {% term entity %} is currently in the listening state, which means that the wake word has been detected and the satellite has opened its microphone to capture the voice command.

Use it when you want an automation to continue only if a satellite is actively capturing audio input. For example, confirm that a satellite is already listening before triggering a follow-up visual cue, or gate a scene change on whether any satellite in the room is mid-capture to avoid disrupting the voice interaction.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the satellite is in, like your living room or kitchen. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Satellite is listening**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the satellite must have been listening before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple satellites are targeted, controls how results combine. Pick **Any** to pass if at least one targeted satellite is listening, or **All** to pass only when every targeted satellite is listening.
For at least:
  description: >
    How long the satellite must have been in the listening state before the condition passes. Set to zero to pass immediately. Because listening windows are short, use small values only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `assist_satellite.is_listening`. A basic example looks like this:

{% example %}
condition: |
  condition: assist_satellite.is_listening
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This passes when `assist_satellite.living_room` is currently listening for a voice command.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple satellites are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the satellite must have been in the listening state before the condition passes.
    Accepts a duration string like `00:00:02` for 2 seconds. Use small values only, as listening windows are typically just a few seconds long.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The **Listening** state is active from the moment the wake word is confirmed until the satellite finishes capturing the voice command and hands it to the pipeline. This window is typically two to five seconds long.
- Because the listening window is short, the **For at least** option should only be set to small values, a few seconds at most. A duration longer than the typical capture window will prevent this condition from ever passing under normal use.
- Satellites that have an **Unavailable** or **Unknown** state do not count as listening. Home Assistant skips them and evaluates the condition using the remaining targeted satellites.
- To check another pipeline state, use [Satellite is idle](/conditions/assist_satellite.is_idle), [Satellite is processing](/conditions/assist_satellite.is_processing), or [Satellite is responding](/conditions/assist_satellite.is_responding).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: pause media playback only if a satellite in the room is already listening

This automation pauses a media player only when a satellite in the same area has already started listening, ensuring media is not paused unnecessarily when the satellite is idle and no voice interaction is taking place.

- **Trigger**: State change of any media player in the living room to `playing`
- **Condition**: Satellite is listening
  - **Target**: Assist satellite of living room
- **Action**: Pause media
  - **Target**: Living room speaker

{% details "YAML example for pausing media only when the living room satellite is already listening" %}

{% example %}
automation: |
  alias: "Pause media only when living room satellite is listening"
  triggers:
    - trigger: state
      entity_id: media_player.living_room_speaker
      to: "playing"
  conditions:
    - condition: assist_satellite.is_listening
      target:
        entity_id: assist_satellite.living_room
  actions:
    - action: media_player.media_pause
      target:
        entity_id: media_player.living_room_speaker
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
