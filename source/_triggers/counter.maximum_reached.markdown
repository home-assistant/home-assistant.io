---
title: "Counter reached maximum"
trigger: counter.maximum_reached
domain: counter
description: "Triggers when one or more counters reach their maximum value."
related_triggers:
  - counter.incremented
  - counter.minimum_reached
  - counter.reset
---

The **Counter reached maximum** trigger fires when a counter {% term helper %} reaches its configured maximum value.
Use it when you want Home Assistant to react when a running count has hit its limit, like sending a reminder, stopping a repeating task, or resetting a user-created counter for the next cycle.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the counter helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Counter reached maximum**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the counter must stay at its maximum before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple counters are targeted, controls whether the trigger fires for **Each** counter, only the **First** counter, or after **All** targeted counters reach their maximum value. Default is **Each**.
  required: false
For at least:
  description: How long the counter must stay at its maximum before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `counter.maximum_reached`. A basic example looks like this:

{% example %}
trigger: |
  trigger: counter.maximum_reached
  target:
    entity_id: counter.chore_reminders
{% endexample %}

This fires when `counter.chore_reminders` reaches its maximum.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple counters are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the counter must stay at its maximum before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires when the counter reaches its configured maximum value.
- If the counter drops below its maximum before the **For at least** time finishes, the timer resets.
- A counter in the `unknown` or `unavailable` state does not satisfy the trigger until it has a valid value again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a reminder when a laundry counter reaches its limit

If you have created a counter helper to track missed laundry runs, you can send a reminder as soon as it reaches its limit.

- **Trigger**: Counter reached maximum
  - **Target**: Laundry reminder counter
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a laundry reminder counter" %}

{% example %}
automation: |
  alias: "Notify when the laundry reminder counter reaches its maximum"
  triggers:
    - trigger: counter.maximum_reached
      target:
        entity_id: counter.laundry_reminders
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry reminder counter reached its maximum."
{% endexample %}

{% enddetails %}

### Automation: reset a visitor counter after it stays full

If you use a counter helper to track a limited number of guest parking spots, you can reset it after it has stayed at its maximum for a while.

- **Trigger**: Counter reached maximum
  - **Target**: Visitor parking counter
  - **For at least**: 00:30:00
- **Action**: Reset counter

{% details "YAML example for resetting a counter after it stays full" %}

{% example %}
automation: |
  alias: "Reset the visitor parking counter after it stays full"
  triggers:
    - trigger: counter.maximum_reached
      target:
        entity_id: counter.visitor_parking
      options:
        for: "00:30:00"
  actions:
    - action: counter.reset
      target:
        entity_id: counter.visitor_parking
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
