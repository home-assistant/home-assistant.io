---
title: "Satellite is responding"
condition: assist_satellite.is_responding
domain: assist_satellite
description: "Tests if one or more Assist satellites are playing back a response."
related_conditions:
  - assist_satellite.is_idle
  - assist_satellite.is_listening
  - assist_satellite.is_processing
---

The **Satellite is responding** condition passes when a targeted Assist satellite {% term entity %} is currently in the responding state, which means that the satellite is actively playing back a text-to-speech response to the user.

Use it when you want an automation to continue only if a satellite is currently speaking. For example, keep the volume of background music lowered as long as the satellite is responding, block a new announcement from overlapping with a response already in progress, or detect satellites that have been stuck in the responding state for too long, that can be a sign of a TTS or network issue that is preventing the pipeline from completing and returning to idle.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the satellite is in, like your living room or kitchen. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Satellite is responding**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the satellite must have been responding before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple satellites are targeted, controls how results combine. Pick **Any** to pass if at least one targeted satellite is responding, or **All** to pass only when every targeted satellite is responding.
For at least:
  description: >
    How long the satellite must have been in the responding state before the condition passes. Set to zero to pass immediately. Use a longer value to detect satellites stuck in the responding state due to a TTS or network error.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `assist_satellite.is_responding`. A basic example looks like this:

{% example %}
condition: |
  condition: assist_satellite.is_responding
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This passes when `assist_satellite.living_room` is currently playing back a response.

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
    Duration the satellite must have been in the responding state before the condition passes.
    Accepts a duration string like `00:00:30` for 30 seconds. Useful to detect a satellite stuck in the responding state.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Use the **For at least** option with a value longer than your longest expected TTS response (for example, `00:00:30`) to detect satellites that are stuck. This is a reliable way to build a self-healing automation that force-resets the satellite when it does not recover on its own.
- Prefer local TTS engines such as Piper to minimize response latency and eliminate cloud-dependent failure modes that can cause satellites to get stuck in this state.
- Satellites that have the **Unavailable** or **Unknown** state do not count as responding. Home Assistant skips them and evaluates the condition using the remaining targeted satellites.
- To check another pipeline state, use [Satellite is idle](/conditions/assist_satellite.is_idle/), [Satellite is listening](/conditions/assist_satellite.is_listening/), or [Satellite is processing](/conditions/assist_satellite.is_processing/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a notification if a satellite has been responding for too long

This is a self-healing automation that checks every minute whether any satellite has been stuck in the responding state for more than 30 seconds. If so, it sends a notification. This avoids leaving a satellite in a broken state that silently wastes resources, as the satellite's speaker might remain active, its pipeline might hold a cloud connection open, and future wake words will not be detected until it returns to idle.

- **Trigger**: Time pattern: every minute
- **Condition**: Satellite is responding
  - **Target**: All Assist satellites (by label)
  - **For at least**: 00:00:30
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for detecting a satellite stuck in the responding state" %}

{% example %}
automation: |
  alias: "Alert when a satellite is stuck responding"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: assist_satellite.is_responding
      target:
        label_id: assist_satellites
      options:
        for: "00:00:30"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Satellite stuck responding"
        message: >
          An Assist satellite has been in the responding state for over
          30 seconds. Check the satellite and its TTS pipeline for errors.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
