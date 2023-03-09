---
title: Alarm Control Panel
description: Instructions on how to integrate Alarm Control Panels into Home Assistant.
ha_category:
  - Alarm
ha_release: 0.7.3
ha_quality_scale: internal
ha_domain: alarm_control_panel
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Home Assistant can give you an interface which is similar to a classic alarm system.
Please see [manual alarm](/integrations/manual) or [template alarm](/integrations/alarm_control_panel.template) for alarm configuration.

### Services

Depending on features supported by a specific integration alarm may expose the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `alarm_arm_home` | `entity_id` <br> `code` (optional) | Arm the alarm in the home mode.
| `alarm_arm_away` | `entity_id` <br> `code` (optional) | Arm the alarm in the away mode.
| `alarm_arm_night` | `entity_id` <br> `code` (optional) | Arm the alarm in the night mode.
| `alarm_arm_vacation` | `entity_id` <br> `code` (optional) | Arm the alarm in the vacation mode.
| `alarm_disarm` | `entity_id` <br> `code` (optional) | Disarm the alarm.
| `alarm_trigger` | `entity_id` <br> `code` (optional) | Trigger the alarm manually.
| `alarm_arm_custom_bypass` | `entity_id` <br> `code` (optional) | Send arm custom bypass command.
