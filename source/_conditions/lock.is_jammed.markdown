---
title: "Lock is jammed"
condition: lock.is_jammed
domain: lock
description: "Tests if one or more locks are jammed."
related_conditions:
  - lock.is_locked
---

The **Lock is jammed** condition helps you check whether a lock is currently stuck. Use it when you want an automation to react only while the problem is still present, like sending repeated reminders or turning on more light at the door.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Lock is jammed**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay jammed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple locks are targeted, controls how results combine. Pick **Any** to pass if at least one targeted lock is jammed, or **All** to pass only when every targeted lock is jammed.
  required: false
For at least:
  description: How long the lock must stay jammed before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lock.is_jammed`. A basic example looks like this:

{% example %}
condition: |
  condition: lock.is_jammed
  target:
    entity_id: lock.front_door
{% endexample %}

This passes when `lock.front_door` is currently jammed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple locks are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the lock must stay jammed before the condition passes. Accepts a
    duration like `00:01:00` for one minute.
  required: false
  type: time
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Locks in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want to wait for a lasting problem instead of a brief status report.
- To check for the normal secure state instead, use [Lock is locked](/conditions/lock.is_locked/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder if the front door lock is still jammed

If a first alert was missed, a follow-up reminder can help you fix the problem before leaving the house unsecured. This automation checks every 10 minutes and sends a reminder while the front door lock is still jammed.

- **Trigger**: Time pattern: Every 10 minutes
- **Condition**: Lock is jammed
- **Target**: Front door lock
- **Condition passes if**: Any
- **For at least**: 00:01:00
- **Action**: Send a notification via mobile_app_phone

{% details "YAML example for repeated jammed lock reminders" %}

{% example %}
automation: |
  alias: "Remind me that the front door lock is jammed"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  conditions:
    - condition: lock.is_jammed
      target:
        entity_id: lock.front_door
      options:
        behavior: any
        for: "00:01:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.mobile_app_phone
      data:
        title: "Front door lock still jammed"
        message: "Check the front door lock and clear the obstruction."
{% endexample %}

{% enddetails %}

### Automation: turn on the porch light while any outside door lock is jammed

Extra light can make it easier to see why a lock is stuck. This automation runs after sunset and turns on the porch light if any targeted outside lock has been jammed for at least 15 seconds.

- **Trigger**: Time pattern: Every 1 minute
- **Condition**: Lock is jammed
- **Target**: Outside door locks (by label)
- **Condition passes if**: Any
- **For at least**: 00:00:15
- **Condition**: Sun is below the horizon
- **Action**: Turn on

{% details "YAML example for lighting an area while a lock is jammed" %}

{% example %}
automation: |
  alias: "Turn on the porch light while a lock is jammed"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: lock.is_jammed
      target:
        label_id: outside_locks
      options:
        behavior: any
        for: "00:00:15"
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
