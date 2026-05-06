---
title: "Door is closed"
condition: door.is_closed
domain: door
description: "Tests if one or more doors are closed."
related_conditions:
  - door.is_open
---

The **Door is closed** condition passes when one or more targeted doors are currently closed. Use it when an automation should continue only after a door is shut.

This condition is useful for safety checks and routines that depend on a closed door, like starting a robot vacuum only after the patio door is shut or arming the house only after every entry point is closed.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Door is closed**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your door is in, like your entryway or garage. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the door must have stayed closed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple doors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted door is closed, or **All** to pass only when every targeted door is closed.
  required: true
For at least:
  description: How long the door must have stayed closed before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `door.is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: door.is_closed
  target:
    entity_id: binary_sensor.front_door
{% endexample %}

This passes when `binary_sensor.front_door` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple doors are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    How long the door must have stayed closed before the condition passes.
  required: false
  type: time
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with door contact sensors and door covers, like garage doors, as long as they use the `door` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted door is closed.
- With **All**, the condition passes only if every available targeted door is closed. If every targeted door is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start robot vacuum only after patio door has been closed for 10 minutes

If pets go in and out through the patio door, you may not want the robot vacuum to start while that door is still being used. This automation waits for a scheduled time, then checks that the patio door has been closed for at least 10 minutes before starting the vacuum.

- **Trigger**: Time
- **Condition**: Door is closed
- **Target**: Patio door
- **For at least**: 00:10:00
- **Action**: Vacuum: Start

{% details "YAML example for delaying vacuum cleaning until the patio door is shut" %}

{% example %}
automation: |
  alias: "Start vacuum after patio door has been closed"
  triggers:
    - trigger: time
      at: "10:00:00"
  conditions:
    - condition: door.is_closed
      target:
        entity_id: binary_sensor.patio_door
      options:
        behavior: any
        for: "00:10:00"
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

### Automation: arm the house at night only when every exterior door is closed

At bedtime, this automation arms the house only if the front door, back door, and garage door are all closed. That keeps you from arming the house while an entry point is still open.

- **Trigger**: Time
- **Condition**: Door is closed
- **Target**: Front door, back door, and garage door
- **Condition passes if**: All
- **Action**: Alarm control panel: Arm away

{% details "YAML example for arming only after all doors are closed" %}

{% example %}
automation: |
  alias: "Arm house only when all doors are closed"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: door.is_closed
      target:
        entity_id:
          - binary_sensor.front_door
          - binary_sensor.back_door
          - cover.garage_door
      options:
        behavior: all
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
