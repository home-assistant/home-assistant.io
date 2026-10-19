---
title: Heiman
description: Connect and control your Heiman Matter devices using the Matter integration
ha_release: '2026.2'
ha_iot_class: Local Push
ha_categories:
  - security_safety.smoke_co_alarms
  - sensors
  - water.meters_leak_detection
ha_domain: heiman
ha_integration_type: brand
works_with:
  - matter
ha_platforms:
  - binary_sensor
  - sensor
ha_iot_standard: matter
ha_brand: true
---

{% include integrations/wwha.md url="https://www.heimantech.com/" %}

## Works with Home Assistant certified devices

{% include integrations/device_list.html brand="heiman" %}
