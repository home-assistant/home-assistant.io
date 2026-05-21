---
title: "Time"
trigger: time
domain: homeassistant
description: "Triggers at a specific time, or from a date/time helper or timestamp-style sensor."
related_triggers:
  - time_pattern
  - state
---

The **Time** trigger is useful when you want an automation to run at a specific time. Use it for daily routines, date-based reminders, or automations that follow a helper or a timestamp sensor.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Time**.
6. Choose a fixed time, or select a date/time helper or timestamp sensor.
7. Optional: Under **Days of the Week**, limit the trigger to specific days.
8. Select **Save**.

### Options in the UI

{% options_ui %}
At time:
  description: The time or time-based entity that Home Assistant should use.
Days of the Week:
  description: Optional weekday filter.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: time`. A basic example looks like this:

{% example %}
trigger: |
  trigger: time
  at: "07:00:00"
{% endexample %}

This runs every day at 7:00 AM.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `time`.
  required: true
  type: string
at:
  description: The time to trigger at. You can use a time string, an `input_datetime` entity, a timestamp sensor, a mapping with `entity_id` and `offset`, a limited template, or a list.
  required: true
  type: string
weekday:
  description: Optional weekday filter, using `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, or `sun`.
  required: false
  type: string
{% endoptions_yaml %}

In YAML, `at` supports a fixed time string, an [`input_datetime`](/integrations/input_datetime/), a timestamp sensor, a mapping with `entity_id` and `offset`, a limited template, or a list that mixes those formats.

When you use an [`input_datetime`](/integrations/input_datetime/), the trigger behavior depends on how that helper is configured:

- A time-only helper fires every day at that time.
- A date-only helper fires once at midnight on that date.
- A helper with both date and time fires once at that date and time.

The `weekday` option accepts one weekday such as `mon` or a list of weekdays.

## Good to know

- You can use a fixed time, a date/time helper, or a timestamp-style sensor.
- If the source entity is `unknown` or `unavailable`, the trigger waits until it has a valid value again.
- YAML also supports multiple `at` values in one trigger.
- With entity-based times, a positive offset may never fire if the source entity updates before the offset is reached.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, set the trigger a few minutes into the future or use a helper you can adjust from the UI.

{% include triggers/more_examples.md %}

### Automation: turn on a light at 7:00 AM on weekdays

If you want a simple weekday routine, this automation turns on a light every weekday morning.

- **Trigger**: Time
  - **At time**: `07:00:00`
  - **Days of the Week**: Monday through Friday
- **Action**: Turn on light

{% details "YAML example for a weekday light schedule" %}

{% example %}
automation: |
  alias: "Turn on the kitchen light on weekday mornings"
  triggers:
    - trigger: time
      at: "07:00:00"
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: light.turn_on
      target:
        entity_id: light.kitchen
{% endexample %}

{% enddetails %}

### Automation: send a reminder when a helper time is reached

If you store a reminder time in a {% term helper %}, this automation can notify you when that time is reached. The helper must be created separately.

- **Trigger**: Time
  - **At time**: Reminder helper
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a reminder based on a helper" %}

{% example %}
automation: |
  alias: "Send my daily reminder"
  triggers:
    - trigger: time
      at: input_datetime.daily_reminder
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It is time for your daily reminder."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
