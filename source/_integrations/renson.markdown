---
title: Renson
description: Instructions on how to integrate Renson Endura Delta sensors into Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_release: 2021.10
ha_iot_class: Local Poll
ha_config_flow: true
ha_codeowners:
  - '@jimmyd-be'
ha_domain: integration
ha_platforms:
  - sensor
  - Binary Sensor
  - Fan
---

The Reason integration pulls in data from the Renson Endura delta application for Android en iOS. It also provides some services to control the ventilation unit.

{% include includes/config_flow.md %}