---
description: Instructions on how to integrate iAlarms alarms into Home Assistant.
ha_release: '2021.5'
ha_domain: ialarm
---

The **iAlarm** {% term integration %} provides connectivity with the [Antifurto365](https://www.antifurtocasa365.it/) iAlarm alarm systems and has also been confirmed to work with the alarm system brands Meian and Emooluxr.
The latest iAlarm-XR alarm system is not supported.

This platform supports the following actions:

- `alarm_control_panel.alarm_arm_away`
- `alarm_control_panel.alarm_arm_home`
- `alarm_control_panel.alarm_disarm`

{% include integrations/config_flow.md %}
