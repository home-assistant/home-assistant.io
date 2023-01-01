---
title: Homely
description: Integrate devices from the Norwegian alarm company Homely into Home Assistant
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_release: xxx
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@kolaf'
ha_domain: homely
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

The Homely integration connects to the Norwegian alarm company Homely. They provide a read-only interface to the monitoring devices in your house.

Currently supported devices:
- Motion sensor mini
- Smoke alarm
- Window sensor

{% include integrations/config_flow.md %}
