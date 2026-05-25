---
title: Garage door
description: This integration provides garage door automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: garage_door
ha_integration_type: system
---

The **Garage door** {% term integration %} provides automation triggers and conditions for binary sensors with device class `garage_door` and covers with device class `garage`.

## Supported entities

The **Garage door** integration supports the following entity types:

- Binary sensors with device class `garage_door`
- Covers with device class `garage`

## Configuration

The **Garage door** integration does not require any configuration.

## Supported functionality

The **Garage door** integration provides the following automation building blocks for supported garage door entities.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Garage door automation examples

You can use these triggers and conditions to react when a garage door opens, confirm that it is closed before another automation continues, or remind yourself when it has been left open.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on the garage entry light when the garage door opens after dark

If you come home after sunset, this automation turns on the light near the garage entry as soon as the garage door opens.

- **Trigger**: Garage door opened
  - **Target**: Garage door
- **Action**: Turn on light

{% details "YAML example for turning on the garage entry light" %}

{% example %}
automation: |
  alias: "Turn on the garage entry light when the garage door opens after dark"
  triggers:
    - trigger: garage_door.opened
      target:
        entity_id: cover.garage_door
  conditions:
    - condition: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: 0
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garage_entry
{% endexample %}

{% enddetails %}

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
