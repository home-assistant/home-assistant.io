---
title: "Lawn mower is paused"
condition: lawn_mower.is_paused
domain: lawn_mower
description: "Tests if one or more lawn mowers are paused."
---

The **Lawn mower is paused** condition passes when one or more targeted mowers are paused.
Use it when an automation should continue only while the mower is stopped in the yard, like sending reminders, waiting before a restart, or holding back another task until you decide what to do next.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is paused**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the mower must stay paused before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted mower is paused, or **All** to pass only when every targeted mower is paused.
For at least:
  description: How long the mower must stay paused before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_paused`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_paused
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently paused.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the mower must stay paused before the condition passes. Accepts a
    duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want the condition to pass only after a longer pause.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Send a reminder if the mower is still paused

If you paused the mower for a short interruption, this automation can remind you to resume or dock it later.

- **Trigger**: Time pattern: Every 30 minutes
- **Condition**: Lawn mower is paused
  - **Target**: Backyard mower
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused-mower reminder" %}

{% example %}
automation: |
  alias: "Remind me that the mower is paused"
  triggers:
    - trigger: time_pattern
      minutes: "/30"
  conditions:
    - condition: lawn_mower.is_paused
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower is still paused."
{% endexample %}

{% enddetails %}

### Automation: Keep the gate automation off while the mower is paused

If the mower is paused in the yard, you might want to keep another outdoor automation from running until the path is clear again.

- **Trigger**: Time pattern: Every 10 minutes
- **Condition**: Lawn mower is paused
  - **Target**: Backyard mower
  - **For at least**: 00:05:00
- **Action**: Turn off automation

{% details "YAML example for pausing another outdoor automation" %}

{% example %}
automation: |
  alias: "Hold the gate routine while the mower is paused"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  conditions:
    - condition: lawn_mower.is_paused
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:05:00"
  actions:
    - action: automation.turn_off
      target:
        entity_id: automation.open_back_gate_for_delivery
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
