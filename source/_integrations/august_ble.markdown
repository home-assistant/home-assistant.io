---
title: August Bluetooth
description: Instructions on how to integrate August Bluetooth locks into Home Assistant.
ha_category:
  - Binary Sensor
  - Lock
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: august_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_integration_type: integration
ha_supporting_domain: yalexs_ble
ha_supporting_integration: Yale Access Bluetooth
---

Integrates [August](https://august.com/) locks over Bluetooth into Home Assistant. To integrate with the August cloud service, or non-lock devices, see the [August](/integrations/august) page.

Following Assa Abloy, Yale's parent company, purchasing August in 2017, most newer devices use the Yale Access branding.

{% include integrations/config_flow.md domain=page.ha_supporting_domain %}
<br><br>
To find more information, please use the [Yale Access Bluetooth](/integrations/yalexs_ble) page.