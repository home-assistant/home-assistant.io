---
title: Satellite started processing
trigger: assist_satellite.started_processing
domain: assist_satellite
description: Triggers after one or more Assist satellites start processing a voice command.
related_triggers:
  - assist_satellite.started_listening
  - assist_satellite.started_responding
  - assist_satellite.idle
---

The **Satellite started processing** trigger fires when one or more Assist satellite {% term entities %} transition to the processing state. This happens after the satellite finishes capturing the voice command and hands it off to the speech-to-text and intent-processing pipeline.

Use it to automate actions during the brief moment the satellite is thinking. For example, create an automation to show a visual indicator on a display that the request is being processed, to log pipeline invocations for usage auditing, or to start a timeout helper that alerts you if processing takes longer than expected and may point to a resource-heavy pipeline.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Satellite started processing**.
5. Select **Add target** and pick the Assist satellite you want to watch. You can also select an area, a floor, a device, or a label, as described in [Targets](#targets).
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, you can set how long the satellite must keep reporting the processing state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted satellite starts processing.
    - **First**: fires only when the first satellite in the group starts processing.
    - **All**: fires only after every targeted satellite is in the processing state.
  required: false
For at least:
  description: How long the satellite or satellites must keep reporting the processing state before the trigger fires. The default is zero (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `assist_satellite.started_processing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: assist_satellite.started_processing
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This fires every time `assist_satellite.living_room` starts processing a voice command.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted satellite starts processing.
    - `first`: fires only when the first satellite starts processing.
    - `all`: fires only after every targeted satellite is in the processing state.
  required: false
  type: string
  default: each
for:
  description: |
    How long the satellite or satellites must keep reporting the processing state before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires as soon as the satellite hands the captured audio to the speech-to-text and intent pipeline. The voice command has not yet been acted upon at this point.
- The processing state spans both speech-to-text transcription and intent recognition. For cloud-based pipelines, processing time is dominated by network round-trip latency, that is typically 100 ms to 500 ms on a fast connection, but up to several seconds under congestion. For local pipelines, total processing time depends entirely on the speech recognition model and hardware, thus can be one to several seconds.
- If you are using a cloud pipeline, keep in mind that processing requires network access. A slow or offline internet connection can keep the satellite in the processing state longer than usual.
- Satellites that have the **Unavailable** or **Unknown** state are skipped in the evaluation of multi-target behavior.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a display when the satellite is processing to save energy

When a satellite starts processing a voice command, this automation turns off a nearby display that is no longer needed for input. Because the command has already been captured and is being interpreted, leaving the display on serves no purpose and wastes standby power. The display can be turned back on when the satellite returns to idle using the [Assist satellite idle](/triggers/assist_satellite.idle) trigger.

- **Trigger**: Satellite started processing
  - **Target**: Kitchen Assist satellite
- **Action**: Turn off switch
  - **Target**: Kitchen display switch

{% details "YAML example for turning off a display when the satellite is processing" %}

{% example %}
automation: |
  alias: "Turn off kitchen display while satellite is processing"
  triggers:
    - trigger: assist_satellite.started_processing
      target:
        entity_id: assist_satellite.kitchen
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.kitchen_display
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
