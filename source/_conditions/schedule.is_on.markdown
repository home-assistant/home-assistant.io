---
title: "Schedule is on"
condition: schedule.is_on
domain: schedule
description: "Tests if one or more schedule blocks are currently active."
related_conditions:
  - schedule.is_off
---

The **Schedule is on** condition is useful when an automation should continue only while a schedule block is active. Use it to limit automations to certain times, or to check whether a routine is currently in effect before doing something.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the schedule you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Schedule is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the schedule block must have been active.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple schedules are targeted, controls whether **Any** targeted schedule must be active or **All** targeted schedules must be active.
  required: false
  default: Any
For at least:
  description: How long the schedule block must have been active for the condition to pass.
  required: false
  default: 00:00:00
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `schedule.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: schedule.is_on
  target:
    entity_id: schedule.evening_routine
  options:
    for: "00:30:00"
{% endexample %}

This passes when `schedule.evening_routine` has been active for 30 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple schedules are targeted, controls whether `any` or `all` targeted schedules must be active.
  required: false
  type: string
  default: any
for:
  description: How long the schedule block must have been active for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A schedule in the `unknown` or `unavailable` state does not match this condition.
- If you use **For at least**, the schedule must stay active for the entire time.
- To check for the opposite state, use [Schedule is off](/conditions/schedule.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the hallway light when motion is detected during the night schedule

If you only want a motion-based automation at certain times, you can use a schedule to decide when it is allowed to run.

- **Trigger**: State: Motion detected
- **Condition**: Schedule is on
  - **Target**: Night hallway schedule
- **Action**: Turn on light
  - **Target**: Hallway light

{% details "YAML example for turning on the hallway light during the night schedule" %}

{% example %}
automation: |
  alias: "Turn on the hallway light during the night schedule"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: schedule.is_on
      target:
        entity_id: schedule.night_hallway
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: turn on the coffee machine only after the morning schedule has been active for 20 minutes

If you want a little delay at the start of your morning routine, you can check whether the schedule has already been active for a while.

- **Trigger**: Time: 06:50
- **Condition**: Schedule is on
  - **Target**: Morning kitchen schedule
  - **For at least**: 00:20:00
- **Action**: Turn on switch
  - **Target**: Coffee machine plug

{% details "YAML example for turning on the coffee machine after the morning schedule has been active for 20 minutes" %}

{% example %}
automation: |
  alias: "Turn on the coffee machine after the morning schedule has been active for 20 minutes"
  triggers:
    - trigger: time
      at: "06:50:00"
  conditions:
    - condition: schedule.is_on
      target:
        entity_id: schedule.morning_kitchen
      options:
        for: "00:20:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.coffee_machine
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
