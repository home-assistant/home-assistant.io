---
title: "Lock is open"
condition: lock.is_open
domain: lock
description: "Tests if one or more locks are open."
related_conditions:
  - lock.is_locked
---

The **Lock is open** condition helps you check whether a lock is currently open. Use it when an automation should continue only while a door is still open, like leaving a light on or delaying another action until the door is closed again.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Lock is open**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple locks are targeted, controls how results combine. Pick **Each** to pass if at least one targeted lock is open, or **All** to pass only when every targeted lock is open.
  required: false
For at least:
  description: How long the lock must stay open before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lock.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: lock.is_open
  target:
    entity_id: lock.front_door
{% endexample %}

This passes when `lock.front_door` is currently open.

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
    How long the lock must stay open before the condition passes. Accepts a
    duration like `00:01:00` for one minute.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Locks in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Not every lock reports an open state. Use this condition only with locks that support open-state reporting.
- To check for the secure state instead, use [Lock is locked](/conditions/lock.is_locked/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: keep the hallway light on while the front door is open

If the front door stays open while you carry things inside, it helps to keep the hallway lit. This automation checks every minute and turns the light on while the door remains open.

- **Trigger**: Time pattern: Every 1 minute
- **Condition**: Lock is open
- **Target**: Front door lock
- **Condition passes if**: Any
- **For at least**: 00:00:10
- **Action**: Turn on

{% details "YAML example for keeping a light on while the door is open" %}

{% example %}
automation: |
  alias: "Keep the hallway light on while the door is open"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: lock.is_open
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:00:10"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: send a reminder if any patio door lock stays open

If you want a simple reminder before bed, check whether any patio door is still open. This automation runs at night and sends a message if any targeted patio lock has stayed open for 2 minutes.

- **Trigger**: Time: 22:30
- **Condition**: Lock is open
  - **Target**: Patio door locks (by label)
  - **Condition passes if**: Any
  - **For at least**: 00:02:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a patio door reminder" %}

{% example %}
automation: |
  alias: "Remind me if a patio door is still open"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: lock.is_open
      target:
        label_id: patio_locks
      options:
        behavior: each
        for: "00:02:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Patio door still open"
        message: "A patio door has remained open for at least 2 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
