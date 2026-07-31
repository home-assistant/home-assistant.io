---
title: "Garage door is closed"
condition: garage_door.is_closed
domain: garage_door
description: "Tests if one or more garage doors are closed."
related_conditions:
  - garage_door.is_open
---

The **Garage door is closed** condition passes when one or more targeted garage doors are currently closed. Use it when an automation should continue only after a garage door is shut.

This condition is useful for security checks and routines that depend on a closed garage door, like arming an alarm or turning on climate control only after the opening is sealed.

## Prerequisites

- The target must be a garage door contact sensor with the garage door device class or a garage door cover with the garage device class.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Garage door is closed**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your garage door is in, like your garage or driveway. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the garage door must have stayed closed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple garage doors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted garage door is closed, or **All** to pass only when every targeted garage door is closed.
For at least:
  description: How long the garage door must have stayed closed before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `garage_door.is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: garage_door.is_closed
  target:
    entity_id: cover.garage_door
{% endexample %}

This passes when `cover.garage_door` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple garage doors are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the garage door must have stayed closed before the condition passes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted garage door is closed.
- With **All**, the condition passes only if every available targeted garage door is closed. If every targeted garage door is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: arm the garage alarm only when the garage door has been closed for 10 minutes

If you have created a bedtime {% term helper %} separately, this automation waits for that helper to turn on, then checks that the garage door has stayed closed for 10 minutes before it arms the alarm.

- **Trigger**: User-created bedtime helper turns on
- **Condition**: Garage door is closed
  - **Target**: Garage door
  - **For at least**: 00:10:00
- **Action**: Arm alarm away

{% details "YAML example for arming the garage alarm after the door stays closed" %}

{% example %}
automation: |
  alias: "Arm the garage alarm only when the garage door has been closed for 10 minutes"
  triggers:
    - trigger: state
      entity_id: input_boolean.bedtime_mode
      to: "on"
  conditions:
    - condition: garage_door.is_closed
      target:
        entity_id: cover.garage_door
      options:
        for: "00:10:00"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.garage_alarm
{% endexample %}

{% enddetails %}

### Automation: start the garage fan only after the garage door has been closed for 5 minutes

If you use a fan to clear heat or fumes from the garage, this automation waits until the garage door has been shut for 5 minutes before it starts the fan.

- **Trigger**: Time
- **Condition**: Garage door is closed
  - **Target**: Garage door
  - **For at least**: 00:05:00
- **Action**: Turn on switch

{% details "YAML example for starting the garage fan after the door closes" %}

{% example %}
automation: |
  alias: "Start the garage fan after the garage door has been closed for 5 minutes"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: garage_door.is_closed
      target:
        entity_id: binary_sensor.garage_door_contact
      options:
        for: "00:05:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.garage_fan
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
