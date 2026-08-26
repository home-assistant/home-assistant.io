---
title: "Counter reached minimum"
trigger: counter.minimum_reached
domain: counter
description: "Triggers when one or more counters reach their minimum value."
related_triggers:
  - counter.decremented
  - counter.maximum_reached
  - counter.reset
---

The **Counter reached minimum** trigger fires when a counter {% term helper %} reaches its configured minimum value.
Use it when you want an automation to react when a count has run all the way down, like stopping a routine, turning something off, or sending a message that a user-created tally has reached its floor.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the counter helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Counter reached minimum**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the counter must stay at its minimum before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple counters are targeted, controls whether the trigger fires for **Each** counter, only the **First** counter, or after **All** targeted counters reach their minimum value. Default is **Each**.
For at least:
  description: How long the counter must stay at its minimum before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `counter.minimum_reached`. A basic example looks like this:

{% example %}
trigger: |
  trigger: counter.minimum_reached
  target:
    entity_id: counter.items_left
{% endexample %}

This fires when `counter.items_left` reaches its minimum.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple counters are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the counter must stay at its minimum before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires when the counter reaches its configured minimum value.
- If the counter moves above its minimum before the **For at least** time finishes, the timer resets.
- A counter in the `unknown` or `unavailable` state does not satisfy the trigger until it has a valid value again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a reminder light when a task counter reaches zero

If you have created a counter helper to track unfinished tasks, you can turn off a reminder light when the count reaches its minimum.

- **Trigger**: Counter reached minimum
  - **Target**: Tasks left counter
- **Action**: Turn off light

{% details "YAML example for clearing a reminder light" %}

{% example %}
automation: |
  alias: "Turn off the reminder light when the task counter reaches its minimum"
  triggers:
    - trigger: counter.minimum_reached
      target:
        entity_id: counter.tasks_left
  actions:
    - action: light.turn_off
      target:
        entity_id: light.reminder
{% endexample %}

{% enddetails %}

### Automation: send a message when a stock counter stays empty

If you use a counter helper to track a supply you refill yourself, you can send a message after it has stayed at its minimum for a while.

- **Trigger**: Counter reached minimum
  - **Target**: Supply counter
  - **For at least**: 01:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an empty supply reminder" %}

{% example %}
automation: |
  alias: "Notify when the supply counter stays at its minimum"
  triggers:
    - trigger: counter.minimum_reached
      target:
        entity_id: counter.supplies_left
      options:
        for: "01:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The supply counter has stayed at its minimum for an hour."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
