---
title: Geocaching
description: Instructions on how to integrate Geocaching accounts within Home Assistant.
ha_category:
  - Sensor
ha_release: 2021.6.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sholofly'
  - '@reinder83'
ha_domain: geocaching
ha_platforms:
  - sensor
---

The Geocaching integration can be used to monitor Geocaching account statistics.

## Sensors

The following sensors are available for each account:

- Username
- Reference code
- Find count
- Hide count
- Favorite points
- Souvenir count
- Awarded favorite points
