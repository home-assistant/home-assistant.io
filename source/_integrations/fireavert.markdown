---
title: FireAvert
description: Connect and control your FireAvert Z-Wave series devices using the Z-Wave integration
ha_release: '2026.8'
ha_iot_class: Local Push
ha_category:
  - Plug
  - Light
  - Sensor
  - Switch
ha_domain: fireavert
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

[FireAvert](https://fireavert.com/) Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)
