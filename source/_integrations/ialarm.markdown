---
title: "Antifurto365 iAlarm"
description: "Instructions on how to integrate iAlarms alarms into Home Assistant."
logo: antifurto365-ialarm.png
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: "2021.5"
ha_domain: ialarm
ha_codeowners:
  - '@RyuzakiKK'
---

The `ialarm` platform provides connectivity with the [Antifurto365](https://www.antifurtocasa365.it/) iAlarm alarm systems and has also been confirmed to work with the alarm system brands Meian and Emooluxr.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home` and `alarm_disarm`.

{% include integrations/config_flow.md %}
