---
title: "Satellite is processing"
condition: assist_satellite.is_processing
domain: assist_satellite
description: "Tests if one or more Assist satellites are processing a voice command."
related_conditions:
  - assist_satellite.is_idle
  - assist_satellite.is_listening
  - assist_satellite.is_responding
---

The **Satellite is processing** condition passes when a targeted Assist satellite {% term entity %} is currently in the processing state, which means that the captured voice command has been handed to the speech-to-text and intent-recognition pipeline and is being interpreted.

Use it when you want an automation to continue only if a satellite is actively running its pipeline. For example, check whether any satellite is still processing before sending a follow-up announcement.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the satellite is in, like your living room or kitchen. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Satellite is processing**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the satellite must have been processing before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple satellites are targeted, controls how results combine. Pick **Any** to pass if at least one targeted satellite is processing, or **All** to pass only when every targeted satellite is processing.
For at least:
  description: >
    How long the satellite must have been in the processing state before the condition passes. Set to zero to pass immediately. Use a longer value to detect pipelines that are taking unusually long to complete.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `assist_satellite.is_processing`. A basic example looks like this:

{% example %}
condition: |
  condition: assist_satellite.is_processing
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This passes when `assist_satellite.living_room` is currently processing a voice command.

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
    Duration the satellite must have been in the processing state before the condition passes.
    Accepts a duration string like `00:00:05` for 5 seconds. Useful to detect a stuck or slow pipeline.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The **Processing** state spans both speech-to-text transcription and intent recognition. For cloud-based pipelines, processing time is dominated by network round-trip latency, which is typically 100 ms to 500 ms on a fast connection, but can be several seconds under congestion. For local pipelines, total processing time depends on the speech recognition model and hardware, so it can range from one to several seconds.
- Use the **For at least** option with a value longer than your pipeline's typical processing time to detect satellites that are stuck. For example, `00:00:10` passes only if the satellite has been processing for more than 10 seconds, which is a reliable signal that something is wrong.
- Prefer local pipelines to reduce network dependency and processing latency. This condition can help surface satellites that consistently process slowly, pointing to an undersized pipeline or a congested connection.
- Satellites that have the **Unavailable** or **Unknown** state do not count as processing. Home Assistant skips them and evaluates the condition using the remaining targeted satellites.
- To check another pipeline state, use [Satellite is idle](/conditions/assist_satellite.is_idle/), [Satellite is listening](/conditions/assist_satellite.is_listening/), or [Satellite is responding](/conditions/assist_satellite.is_responding/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: skip a disruptive alert if any satellite is currently processing a command

This automation suppresses a loud scheduled alert, such as a chime or siren test, when any satellite is still processing a voice command. This avoids wasting a full pipeline run by corrupting the satellite reply, which would force you to repeat the command to properly hear the response.

- **Trigger**: Time: 12:00
- **Condition**: Not
  - **Condition**: Satellite is processing
    - **Target**: All Assist satellites (by label)
- **Action**: Turn on switch
  - **Target**: Noon chime switch

{% details "YAML example for skipping a chime when any satellite is processing" %}

{% example %}
automation: |
  alias: "Skip noon chime if a satellite is processing"
  triggers:
    - trigger: time
      at: "12:00:00"
  conditions:
    - condition: not
      conditions:
        - condition: assist_satellite.is_processing
          target:
            label_id: assist_satellites
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.noon_chime
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
