---
title: Prosegur Alarm
description: Instructions on how to integrate Prosegur Smart Alarms into Home Assistant.
ha_category:
  - Alarm
  - Camera
ha_release: 2021.8
ha_codeowners:
  - '@dgomes'
ha_iot_class: Cloud Polling
ha_domain: prosegur
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - camera
  - diagnostics
ha_integration_type: integration
---

Integrate [Prosegur](https://www.prosegur.com/) Smart Alarms into Home Assistant. 

Prosegur is a company providing intruder protection and detection systems to ensure the security of your home in Iberia, South America and RSA. 

Prosegur has a line of connected alarm systems that can be controlled remotely through a cloud service. This integration taps into the cloud service API, providing functionalities similar to their mobile app.

There is currently support for the following device types within Home Assistant:
- Alarm
- Camera

{% include integrations/config_flow.md %}

### Action `camera.request_image`

This action will have Prosegur cloud service "Request image" from your local camera. This action should only be called seldom, as Prosegur tends to throttle this action for long periods of time, resulting in errors for both this integration and your Prosegur mobile application.
