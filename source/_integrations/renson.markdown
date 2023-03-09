---
title: Renson
description: Instructions on how to integrate Renson Endura Delta sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Fan
  - Number
  - Sensor
ha_release: 2023.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@jimmyd-be'
ha_domain: renson
ha_platforms:
  - binary_sensor
  - button
  - fan
  - number
  - sensor
ha_integration_type: integration
---

The Renson integration pulls in data from the Renson Endura delta application for Android en iOS. It also provides some services to control the ventilation unit.

{% include includes/config_flow.md %}
