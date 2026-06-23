---
title: "Lock locked"
trigger: lock.locked
domain: lock
description: "Triggers after one or more locks lock."
related_triggers:
  - lock.unlocked
---

The **Lock locked** trigger helps you react when a lock reaches the locked state. Use it when you want Home Assistant to confirm that a door is secured before turning off lights, arming an alarm, or sending a status update.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Lock locked**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay locked before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple locks are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted lock locks, **First** to fire only when the first targeted lock locks, or **All** to fire only after every targeted lock is locked.
  required: false
For at least:
  description: How long the lock must stay locked before the trigger fires. Set to zero to fire immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lock.locked`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lock.locked
  target:
    entity_id: lock.front_door
{% endexample %}

This fires when `lock.front_door` changes to the locked state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple locks are targeted, controls when the trigger fires.
    Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the lock must stay locked before the trigger fires. Accepts a
    duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires only when a lock changes into the locked state from a known state. If a lock comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you want to wait until the lock has stayed secure for a while before acting.
- To react when a door is no longer secured, use [Lock unlocked](/triggers/lock.unlocked/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the entry light after the front door locks

When you lock the front door after coming in, you may not need the bright entry light anymore. This automation waits 30 seconds after the door locks, then turns the light off.

- **Trigger**: Lock locked
- **Target**: Front door lock
- **Trigger when**: Each
- **For at least**: 00:00:30
- **Action**: Turn off

{% details "YAML example for turning off the entry light" %}

{% example %}
automation: |
  alias: "Turn off the entry light after locking"
  triggers:
    - trigger: lock.locked
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:00:30"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.entry
{% endexample %}

{% enddetails %}

### Automation: arm the alarm when all the outside doors are locked

If you want one final check before arming the house, wait until every outside door lock reports locked. This automation arms the alarm only after all targeted locks are secure.

- **Trigger**: Lock locked
- **Target**: Outside door locks (by label)
- **Trigger when**: All
- **For at least**: 00:00:00
- **Action**: Arm alarm away

{% details "YAML example for arming the alarm after all locks are secure" %}

{% example %}
automation: |
  alias: "Arm the alarm after all locks are locked"
  triggers:
    - trigger: lock.locked
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

{% include triggers/stuck.md %}

{% include triggers/related.md %}
