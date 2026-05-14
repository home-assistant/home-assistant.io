---
title: "Counter decremented"
trigger: counter.decremented
domain: counter
description: "Triggers after one or more counters decrement."
related_triggers:
  - counter.incremented
  - counter.minimum_reached
---

The **Counter decremented** trigger fires when a counter helper decreases by its configured step size.
Use it when you want an automation to react as a count goes down, like turning something off, sending a warning that a balance is getting low, or reacting when a user-created tally is being worked back down to zero.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the counter helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Counter decremented**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options in the UI.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `counter.decremented`. A basic example looks like this:

{% example %}
trigger: |
  trigger: counter.decremented
  target:
    entity_id: counter.items_left
{% endexample %}

This fires when `counter.items_left` decrements.

### Options in YAML

This trigger has no additional YAML options.

{% include triggers/targets.md %}

## Good to know

- The trigger fires each time the counter decrements.
- A counter in the `unknown` or `unavailable` state does not fire the trigger until it has a valid value again.
- Resetting a counter does not count as a decrement. To react to resets, use [Counter reset](/triggers/counter.reset/).
- To react only when a counter reaches its configured minimum, use [Counter reached minimum](/triggers/counter.minimum_reached/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a fan when a break counter decrements to its last step

If you have created a counter helper to track short cooling breaks, you can turn off a fan whenever the count is worked back down.

- **Trigger**: Counter decremented
  - **Target**: Cooling break counter
- **Action**: Turn off fan

{% details "YAML example for turning off a fan from a counter decrement" %}

{% example %}
automation: |
  alias: "Turn off the fan when the cooling break counter decrements"
  triggers:
    - trigger: counter.decremented
      target:
        entity_id: counter.cooling_breaks_left
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.office
{% endexample %}

{% enddetails %}

### Automation: send a message when a queue counter decrements

If you use a counter helper to track chores left to finish, you can send a quick update each time the count goes down.

- **Trigger**: Counter decremented
  - **Target**: Chore queue counter
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a counter decrement notification" %}

{% example %}
automation: |
  alias: "Notify when the chore queue counter decrements"
  triggers:
    - trigger: counter.decremented
      target:
        entity_id: counter.chores_left
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The chore queue counter went down."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
