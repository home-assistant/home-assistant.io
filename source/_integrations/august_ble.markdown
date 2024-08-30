---
title: August Bluetooth
description: Connect and control your August Bluetooth devices using the Yale Access Bluetooth integration
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_release: 2022.9
ha_domain: august_ble
ha_integration_type: virtual
ha_supporting_domain: yalexs_ble
ha_supporting_integration: Yale Access Bluetooth
ha_bluetooth: true
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_iot_class: Local Push
---

Integrates [August](https://august.com/) locks over Bluetooth into Home Assistant.

Following Assa Abloy, Yale's parent company, purchasing August in 2017, most newer devices use the Yale Access branding.

{% include integrations/supported_brand.md %}
