---
title: Prosegur
description: Instructions on how to integrate Prosegur Smart Alarms into Home Assistant.
ha_category:
  - Alarm
ha_release: 2021.6
ha_codeowners:
  - '@dgomes'
ha_iot_class: Cloud Polling
ha_domain: prosegur
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
---

Integrate [Prosegur](https://www.prosegur.com/) Smart Alarms into Home Assistant. Prosegur is company providing intruder protection and detection systems to ensure the security of your home in Iberia, South America and RSA. They have a line of connected alarm systems that can be controlled remotely through a cloud service. This integration taps in to the cloud service API providing functionalities such as ARM_HOME, ARM_AWAY and DISARM.

{% include integrations/config_flow.md %}
