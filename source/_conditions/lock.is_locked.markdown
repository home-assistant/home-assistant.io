---
title: "Lock is locked"
condition: lock.is_locked
domain: lock
description: "Tests if one or more locks are locked."
related_conditions:
  - lock.is_unlocked
---

The **Lock is locked** condition helps you check whether a lock is currently secure. Use it when an automation should continue only after a door has been locked, like arming an alarm or turning off devices near an entry.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Lock is locked**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay locked before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple locks are targeted, controls how results combine. Pick **Each** to pass if at least one targeted lock is locked, or **All** to pass only when every targeted lock is locked.
  required: false
For at least:
  description: How long the lock must stay locked before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lock.is_locked`. A basic example looks like this:

{% example %}
condition: |
  condition: lock.is_locked
  target:
    entity_id: lock.front_door
{% endexample %}

This passes when `lock.front_door` is currently locked.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple locks are targeted, controls how results combine. Accepts
    `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the lock must stay locked before the condition passes. Accepts a
    duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Locks in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** when you want to avoid acting on a short state change.
- To check whether a door is not secured, use [Lock is unlocked](/conditions/lock.is_unlocked/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: arm the alarm only if all the outside door locks are locked

Before arming the house for the night, you may want one final check that every outside door is secure. This automation runs at bedtime and arms the alarm only if all targeted locks are locked.

- **Trigger**: Time: 23:00
- **Condition**: Lock is locked
- **Target**: Outside door locks (by label)
- **Condition passes if**: All
- **For at least**: 00:00:00
- **Action**: Arm alarm away

{% details "YAML example for checking all outside locks" %}

{% example %}
automation: |
  alias: "Arm the alarm only when all locks are locked"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: lock.is_locked
      target:
        label_id: outside_locks
      options:
        behavior: all
        for: "00:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: turn off the porch light if the front door has been locked for 5 minutes

Once the front door has stayed locked for a while, you may not need the porch light anymore. This automation checks every evening and turns the light off after the door has remained locked for 5 minutes.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Lock is locked
- **Target**: Front door lock
- **Condition passes if**: Any
- **For at least**: 00:05:00
- **Condition**: Sun is below the horizon
- **Action**: Turn off

{% details "YAML example for turning off the porch light" %}

{% example %}
automation: |
  alias: "Turn off the porch light after the door stays locked"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: lock.is_locked
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:05:00"
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_off
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
