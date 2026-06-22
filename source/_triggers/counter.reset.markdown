---
title: "Counter reset"
trigger: counter.reset
domain: counter
description: "Triggers after one or more counters are reset."
related_triggers:
  - counter.incremented
  - counter.decremented
  - counter.maximum_reached
  - counter.minimum_reached
---

The **Counter reset** trigger fires when a counter {% term helper %} returns to its initial value.
Use it when you want to restart a routine, clear a reminder, or react when a user-created counter has gone back to its starting point.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the counter helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Counter reset**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the counter must stay at its reset value before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple counters are targeted, controls whether the trigger fires for **Each** counter, only the **First** counter, or after **All** targeted counters are reset. Default is **Each**.
For at least:
  description: How long the counter must stay at its reset value before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `counter.reset`. A basic example looks like this:

{% example %}
trigger: |
  trigger: counter.reset
  target:
    entity_id: counter.guest_visits
{% endexample %}

This fires when `counter.guest_visits` returns to its initial value.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple counters are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the counter must stay at its reset value before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires when the counter returns to its initial value, or to `0` if no initial value is configured.
- If the counter changes again before the **For at least** time finishes, the timer resets.
- A counter in the `unknown` or `unavailable` state does not satisfy the trigger until it has a valid value again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a reminder light when a counter returns to its starting value

If you use a counter helper to track a repeating task, you can turn off a reminder light as soon as the counter returns to its starting value.

- **Trigger**: Counter reset
  - **Target**: Reminder counter
- **Action**: Turn off light

{% details "YAML example for clearing a light when a counter returns to its starting value" %}

{% example %}
automation: |
  alias: "Turn off the reminder light when the counter returns to its starting value"
  triggers:
    - trigger: counter.reset
      target:
        entity_id: counter.reminders_today
  actions:
    - action: light.turn_off
      target:
        entity_id: light.reminder
{% endexample %}

{% enddetails %}

### Automation: send a message when a counter returns to its starting value

If you use a counter helper to track a recurring task, you can send a message when the counter returns to its starting value so you know a new cycle has begun.

- **Trigger**: Counter reset
  - **Target**: Task counter
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when a counter returns to its starting value" %}

{% example %}
automation: |
  alias: "Send a notification when the counter returns to its starting value"
  triggers:
    - trigger: counter.reset
      target:
        entity_id: counter.tasks_today
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The task counter returned to its starting value."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
