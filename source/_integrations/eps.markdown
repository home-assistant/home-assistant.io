---
title: "EPS"
description: "Instructions on how to integrate EPS alarms into Home Assistant."
ha_category: "Alarm"
ha_iot_class: "Cloud Polling"
ha_config_flow: true
ha_release: '2023.11'
ha_domain: EPS
ha_codeowners:
  - '@parvarm'
ha_platforms:
  - alarm_control_panel
ha_integration_type: integration
---

The EPS integration provides connectivity with alarm systems based on [EPS](https://www.eps.fr/). Some other companies (ex: Homiris) distribute those systems.

This platform supports the following services:

- `alarm_control_panel.alarm_arm_away`
- `alarm_control_panel.alarm_arm_night`
- `alarm_control_panel.alarm_disarm`

{% include integrations/config_flow.md %}
