---
title: "Schedule block ended"
trigger: schedule.turned_off
domain: schedule
description: "Triggers when a schedule block ends."
related_triggers:
  - schedule.turned_on
---

The **Schedule block ended** trigger is useful when you want something to happen as soon as a scheduled time block finishes. Use it to turn something off at the end of a routine, or to wait until a schedule has been inactive for a while before continuing.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the schedule you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Schedule block ended**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the schedule must stay inactive before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple schedules are targeted, controls whether the trigger fires for **Each** schedule, only the **First** schedule, or after **All** targeted schedules end a block.
  required: false
  default: Each
For at least:
  description: How long the schedule must stay inactive before the trigger fires.
  required: false
  default: 00:00:00
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `schedule.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: schedule.turned_off
  target:
    entity_id: schedule.focus_time
  options:
    for: "00:30:00"
{% endexample %}

This fires when `schedule.focus_time` has been inactive for 30 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple schedules are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the schedule must stay inactive before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A schedule in the `unknown` or `unavailable` state does not trigger this automation.
- If another schedule block starts before the **For at least** time finishes, the timer resets.
- To react when a schedule block starts instead, use [Schedule block started](/triggers/schedule.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the heater when the office schedule ends

If you use a schedule to define office hours, you can turn off a space heater as soon as that schedule block finishes.

- **Trigger**: Schedule block ended
  - **Target**: Office heating schedule
- **Action**: Turn off switch
  - **Target**: Office heater

{% details "YAML example for turning off the heater when the office schedule ends" %}

{% example %}
automation: |
  alias: "Turn off the heater when the office schedule ends"
  triggers:
    - trigger: schedule.turned_off
      target:
        entity_id: schedule.office_heating
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.office_heater
{% endexample %}

{% enddetails %}

### Automation: send a reminder if the quiet-time schedule has been off for 15 minutes

If a quiet period has ended and stayed inactive for a while, you can send yourself a reminder that the room is ready to use again.

- **Trigger**: Schedule block ended
  - **Target**: Quiet-time schedule
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a reminder after quiet time has ended" %}

{% example %}
automation: |
  alias: "Send a reminder after quiet time has ended"
  triggers:
    - trigger: schedule.turned_off
      target:
        entity_id: schedule.quiet_time
      options:
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Quiet time ended 15 minutes ago."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
