---
title: Heiman
description: Connect and control your Heiman Matter devices using the Matter integration
ha_release: '2026.2'
ha_iot_class: Local Push
ha_category:
  - Binary Sensor
  - Sensor
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

## Supported devices

{% include integrations/device_list.html brand="heiman" %}
