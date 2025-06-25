---
title: Zooz
description: Connect and control your Zooz Z-Wave series devices using the Z-Wave integration
ha_release: '2025.7'
ha_iot_class: Local Push
ha_category:
  - Lock
ha_domain: zooz
ha_integration_type: brand
ha_platforms:
  - lock
ha_iot_standard: zwave
ha_brand: true
---

Zooz Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)
