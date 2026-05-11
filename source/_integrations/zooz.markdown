---
title: Zooz
description: Connect and control your Zooz Z-Wave series devices using the Z-Wave integration
ha_release: '2025.7'
ha_iot_class: Local Push
ha_category:
  - Plug
  - Light
  - Sensor
  - Switch
  - Water management
ha_domain: zooz
ha_integration_type: brand
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
works_with:
  - zwave
ha_iot_standard: zwave
ha_brand: true
---

{% include integrations/wwha.md url="https://www.getzooz.com/" %}

## Supported devices

{% include integrations/device_list.html brand="Zooz" group_by_type="true" %}
