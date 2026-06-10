---
title: Eve
description: Connect and control your Eve Matter devices using the Matter integration
ha_release: '2025.4'
ha_iot_class: Local Push
ha_category:
  - Energy
ha_domain: eve
ha_integration_type: brand
ha_platforms:
  - binary_sensor
  - cover
  - sensor
ha_iot_standard: matter
ha_brand: true
works_with:
  - matter
---

{% include integrations/wwha.md url="https://www.evehome.com/" %}

## Supported devices

{% include integrations/device_list.html brand="eve" %}
