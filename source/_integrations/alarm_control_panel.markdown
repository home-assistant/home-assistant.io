---
title: Alarm control panel
description: Instructions on how to integrate Alarm control panels into Home Assistant.
ha_category:
  - Alarm
ha_release: 0.7.3
ha_quality_scale: internal
ha_domain: alarm_control_panel
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/manual/
    title: Manual alarm
  - docs: /integrations/alarm_control_panel.template/
    title: Template alarm
---

Home Assistant can give you an interface which is similar to a classic alarm system.
Please see [manual alarm](/integrations/manual) or [template alarm](/integrations/alarm_control_panel.template) for alarm configuration.

{% include integrations/building_block_integration.md %}

## The state of an alarm panel entity

An alarm panel entity can have the following states. Not all integrations implement all the different states.

- **Disarmed**: The alarm is disarmed (off).
- **Armed home**: The alarm is armed in home mode.
- **Armed away**: The alarm is armed in away mode.
- **Armed night**: The alarm is armed in night mode.
- **Armed vacation**: The alarm is armed in vacation mode.
- **Armed custom bypass**: The alarm is armed in bypass mode.
- **Pending**: The alarm is pending (towards triggered).
- **Arming**: The alarm is in the process of being armed.
- **Disarming**: The alarm is in the process of being disarmed.
- **Triggered**: The alarm has been triggered.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.


## Actions

Depending on features supported by a specific integration alarm may expose the following actions:

| Action                    | Data                               | Description                         |
| ------------------------- | ---------------------------------- | ----------------------------------- |
| `alarm_arm_home`          | `entity_id` <br> `code` (optional) | Arm the alarm in the home mode.     |
| `alarm_arm_away`          | `entity_id` <br> `code` (optional) | Arm the alarm in the away mode.     |
| `alarm_arm_night`         | `entity_id` <br> `code` (optional) | Arm the alarm in the night mode.    |
| `alarm_arm_vacation`      | `entity_id` <br> `code` (optional) | Arm the alarm in the vacation mode. |
| `alarm_disarm`            | `entity_id` <br> `code` (optional) | Disarm the alarm.                   |
| `alarm_trigger`           | `entity_id` <br> `code` (optional) | Trigger the alarm manually.         |
| `alarm_arm_custom_bypass` | `entity_id` <br> `code` (optional) | Send arm custom bypass command.     |
