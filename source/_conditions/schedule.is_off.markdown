---
title: "Schedule is off"
condition: schedule.is_off
domain: schedule
description: "Tests if one or more schedule blocks are currently not active."
related_conditions:
  - schedule.is_on
---

The **Schedule is off** condition is useful when an automation should continue only while a schedule is inactive. Use it to avoid interruptions during blocked times, or to wait until one or more scheduled routines have finished.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the schedule you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Schedule is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the schedule must have been inactive.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple schedules are targeted, controls whether **Any** targeted schedule must be inactive or **All** targeted schedules must be inactive.
  required: false
  default: Any
For at least:
  description: How long the schedule must have been inactive for the condition to pass.
  required: false
  default: 00:00:00
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `schedule.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: schedule.is_off
  target:
    entity_id: schedule.quiet_time
  options:
    for: "00:30:00"
{% endexample %}

This passes when `schedule.quiet_time` has been inactive for 30 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple schedules are targeted, controls whether `any` or `all` targeted schedules must be inactive.
  required: false
  type: string
  default: any
for:
  description: How long the schedule must have been inactive for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A schedule in the `unknown` or `unavailable` state does not match this condition.
- If you use **For at least**, the schedule must stay inactive for the entire time.
- To check for the opposite state, use [Schedule is on](/conditions/schedule.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder when the front door opens outside your delivery schedule

If you use a schedule to track when deliveries are expected, you can send yourself a reminder when the door opens outside that time.

- **Trigger**: State: Front door opened
- **Condition**: Schedule is off
  - **Target**: Delivery schedule
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a reminder when the front door opens outside your delivery schedule" %}

{% example %}
automation: |
  alias: "Send a reminder when the front door opens outside the delivery schedule"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: schedule.is_off
      target:
        entity_id: schedule.delivery_window
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door opened outside the delivery schedule."
{% endexample %}

{% enddetails %}

### Automation: start the robot vacuum only when both quiet-time schedules are off

If you use schedules to keep certain times interruption-free, you can start your robot vacuum only when both of those schedules are no longer active.

- **Trigger**: Time: 14:00
- **Condition**: Schedule is off
  - **Target**: Quiet time schedule, Meeting schedule
  - **Condition passes if**: All
- **Action**: Start vacuum cleaner
  - **Target**: Living room vacuum

{% details "YAML example for starting the robot vacuum when both quiet-time schedules are off" %}

{% example %}
automation: |
  alias: "Start the robot vacuum when both quiet-time schedules are off"
  triggers:
    - trigger: time
      at: "14:00:00"
  conditions:
    - condition: schedule.is_off
      target:
        entity_id:
          - schedule.quiet_time
          - schedule.meeting_time
      options:
        behavior: all
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.living_room
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
