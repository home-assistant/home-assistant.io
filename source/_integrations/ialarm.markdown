---
title: Antifurto365 iAlarm
description: Instructions on how to integrate iAlarms alarms into Home Assistant.
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '2021.5'
ha_domain: ialarm
ha_codeowners:
  - '@RyuzakiKK'
ha_platforms:
  - alarm_control_panel
ha_integration_type: integration
---

The iAlarm integration provides connectivity with the [Antifurto365](https://www.antifurtocasa365.it/) iAlarm alarm systems and has also been confirmed to work with the alarm system brands Meian and Emooluxr.
Please note that the latest iAlarm-XR alarm system is not supported.

This platform supports the following actions:

- `alarm_control_panel.alarm_arm_away`
- `alarm_control_panel.alarm_arm_home`
- `alarm_control_panel.alarm_disarm`

{% include integrations/config_flow.md %}
