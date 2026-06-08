---
title: "Satellite is idle"
condition: assist_satellite.is_idle
domain: assist_satellite
description: "Tests if one or more Assist satellites are idle."
related_conditions:
  - assist_satellite.is_listening
  - assist_satellite.is_processing
  - assist_satellite.is_responding
---

The **Satellite is idle** condition passes when a targeted Assist satellite {% term entity %} is currently in the idle state, which means that the satellite has finished any active voice pipeline run and is waiting quietly for the next wake word.

Use it when you want an automation to continue only if the satellite is not currently busy with a voice interaction. For example, gate an announcement so it is only delivered when the satellite is not already mid-conversation, confirm all satellites are idle before running a scheduled pipeline test, or allow a follow-up action to proceed only after a previous voice session has fully completed.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the satellite is in, like your living room or kitchen. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Satellite is idle**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the satellite must have been idle before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple satellites are targeted, controls how results combine. Pick **Any** to pass if at least one targeted satellite is idle, or **All** to pass only when every targeted satellite is idle.
  required: false
For at least:
  description: >
    How long the satellite must have been idle before the condition passes. Set to zero to pass immediately. Useful to confirm that a satellite has fully settled before acting.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `assist_satellite.is_idle`. A basic example looks like this:

{% example %}
condition: |
  condition: assist_satellite.is_idle
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This passes when `assist_satellite.living_room` is currently idle.

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
    Duration the satellite must have been idle before the condition passes.
    Accepts a duration string like `00:00:05` for 5 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A satellite without a configured wake word engine remains in the **Idle** state permanently until a pipeline is triggered externally. In that case, this condition will always pass.
- Satellites that have the **Unavailable** or **Unknown** state are skipped from the condition evaluation.
- Use the **For at least** option to add a short delay, for example 5 seconds, before acting. This avoids race conditions where an action fires before the satellite has fully settled after a pipeline run.
- To check another pipeline state, use [Satellite is listening](/conditions/assist_satellite.is_listening), [Satellite is processing](/conditions/assist_satellite.is_processing), or [Satellite is responding](/conditions/assist_satellite.is_responding).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: gate an energy-saving announcement so it is only delivered when all satellites are idle

This automation delivers a daily energy-saving tip only when every satellite in the home is confirmed idle. It avoids interrupting an active voice session, which would require you to repeat the command, wasting a full pipeline run of compute and network resources.

- **Trigger**: Time: 20:00
- **Condition**: Satellite is idle
  - **Target**: All Assist satellites (by label)
  - **Condition passes if**: All
- **Action**: Announce on satellite
  - **Target**: All Assist satellites (by label)

{% details "YAML example for delivering an energy-saving announcement only when all satellites are idle" %}

{% example %}
automation: |
  alias: "Deliver energy tip only when all satellites are idle"
  triggers:
    - trigger: time
      at: "20:00:00"
  conditions:
    - condition: assist_satellite.is_idle
      target:
        label_id: assist_satellites
      options:
        behavior: all
        for: "00:00:05"
  actions:
    - action: assist_satellite.announce
      target:
        label_id: assist_satellites
      data:
        message: >
          Evening reminder: turn off lights and devices you are not using
          to save energy overnight.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
