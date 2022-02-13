---
title: Alarm Control Panel
description: Instructions on how to integrate Alarm Control Panels into Home Assistant.
ha_category:
  - Alarm
ha_release: 0.7.3
ha_quality_scale: internal
ha_domain: alarm_control_panel
---

Home Assistant can give you an interface which is similar to a classic alarm system.
Please see [manual alarm](/integrations/manual) for alarm configuration.

### Attributes

Alarm system exposes the following attributes:

- `code_format` - i.e., `text`, `number` or `null` if no code is needed
- `code_arm_required` - whether code is required to control the alarm
- `supported_features` - a bitmask representing which features are supported by the alarm. See values for each feature below. For example, if alarm supports "arm home", "arm away" and "trigger" features this value will be 11 (1 + 2 + 8).
  - 1 - arm home
  - 2 - arm away
  - 4 - arm night
  - 8 - trigger
  - 16 - custom bypass
  - 32 - arm vacation

### Services

Depending on supported features alarm may expose the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `alarm_arm_home` | `entity_id` <br> `code` (optional) | Arm the alarm in the home mode.
| `alarm_arm_away` | `entity_id` <br> `code` (optional) | Arm the alarm in the away mode.
| `alarm_arm_night` | `entity_id` <br> `code` (optional) | Arm the alarm in the night mode.
| `alarm_arm_vacation` | `entity_id` <br> `code` (optional) | Arm the alarm in the vacation mode.
| `alarm_disarm` | `entity_id` <br> `code` (optional) | Disarm the alarm.
| `alarm_trigger` | `entity_id` <br> `code` (optional) | Trigger the alarm manually.
| `alarm_arm_custom_bypass` | `entity_id` <br> `code` (optional) | Send arm custom bypass command.
