---
title: "Counter incremented"
trigger: counter.incremented
domain: counter
description: "Triggers after one or more counters increment."
related_triggers:
  - counter.decremented
  - counter.maximum_reached
---

The **Counter incremented** trigger fires when a counter {% term helper %} increases by its configured step size.
Use it when you want another automation to react every time a count goes up, like updating a light, sending a reminder, or starting a follow-up task after a button press or another event increments the counter.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the counter helper you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Counter incremented**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options in the UI.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `counter.incremented`. A basic example looks like this:

{% example %}
trigger: |
  trigger: counter.incremented
  target:
    entity_id: counter.mail_arrivals
{% endexample %}

This fires when `counter.mail_arrivals` increments.

### Options in YAML

This trigger has no additional YAML options.

{% include triggers/targets.md %}

## Good to know

- The trigger fires each time the counter increments.
- A counter in the `unknown` or `unavailable` state does not fire the trigger until it has a valid value again.
- Resetting a counter does not count as an increment. To react to resets, use [Counter reset](/triggers/counter.reset/).
- To react only when a counter reaches its configured maximum, use [Counter reached maximum](/triggers/counter.maximum_reached/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a porch light after a visitor counter increments

If you have created a counter helper that tracks front door visits, you can turn on the porch light each time the count goes up after dark.

- **Trigger**: Counter incremented
  - **Target**: Visitor counter
- **Condition**: Sun is below the horizon
- **Action**: Turn on light

{% details "YAML example for turning on a porch light from a counter" %}

{% example %}
automation: |
  alias: "Turn on the porch light when the visitor counter increments"
  triggers:
    - trigger: counter.incremented
      target:
        entity_id: counter.visitors_today
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: send a notification when a package counter increments

If you use a counter helper to log package scans, you can send yourself a notification each time the count increases.

- **Trigger**: Counter incremented
  - **Target**: Package counter
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a package counter notification" %}

{% example %}
automation: |
  alias: "Notify when the package counter increments"
  triggers:
    - trigger: counter.incremented
      target:
        entity_id: counter.packages_today
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The package counter increased."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
