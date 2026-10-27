---
title: "Timer remaining time reached"
trigger: timer.remaining_time_reached
domain: timer
description: "Triggers when one or more timers reach a specific remaining time."
related_triggers:
  - timer.finished
  - timer.started
---

The **Timer remaining time reached** trigger fires when a running timer reaches the remaining time you set. Use it for reminders shortly before a timer finishes.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer remaining time reached**.
6. Under **Time remaining**, enter the remaining time that should trigger the automation.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Time remaining:
  description: The remaining time at which the trigger fires.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.remaining_time_reached`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.remaining_time_reached
  target:
    entity_id: timer.laundry
  options:
    remaining: "00:05:00"
{% endexample %}

This fires when `timer.laundry` has five minutes left.

### Options in YAML

{% options_yaml %}
remaining:
  description: The remaining time at which the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md custom_trigger_variables="true" %}

### Trigger variables

When the trigger reacts, the `trigger` variable contains the following data:

- `trigger.entity_id`: Entity ID of the timer.
- `trigger.to_state`: State object of the timer from its last state update before the trigger reacts, for example, when it started, resumed, or its time was changed. Home Assistant doesn't read the state again at the moment the trigger reacts, so attributes such as `remaining` don't show the remaining time at that moment.
- `trigger.remaining`: Timedelta object of the remaining time that you set in the trigger.

This trigger doesn't include `trigger.from_state` or `trigger.for`.

For the data that all triggers include, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- This trigger is useful for reminders shortly before a timer finishes.
- If you want to react when the countdown reaches zero, use [Timer finished](/triggers/timer.finished/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a reminder when the laundry timer has five minutes left

Get a reminder before the cycle finishes so you can be ready to empty the machine.

- **Trigger**: Timer remaining time reached
  - **Target**: Laundry timer
- **Time remaining**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a laundry timer reminder" %}

{% example %}
automation: |
  alias: "Notify when the laundry timer has five minutes left"
  triggers:
    - trigger: timer.remaining_time_reached
      target:
        entity_id: timer.laundry
      options:
        remaining: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry timer has five minutes left."
{% endexample %}

{% enddetails %}

### Automation: flash the hallway light when the entry timer has one minute left

Use a short visual warning before a timed hallway light is about to turn off.

- **Trigger**: Timer remaining time reached
  - **Target**: Entry timer
- **Time remaining**: 00:01:00
- **Action**: Turn on light

{% details "YAML example for a hallway light warning" %}

{% example %}
automation: |
  alias: "Flash the hallway light when the entry timer has one minute left"
  triggers:
    - trigger: timer.remaining_time_reached
      target:
        entity_id: timer.entry
      options:
        remaining: "00:01:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 100
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
