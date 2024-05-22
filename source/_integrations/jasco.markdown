---
title: Jasco
description: Connect and control your Jasco Z-Wave devices using the Z-Wave integration
ha_release: '2022.11'
ha_iot_class: Local Push
ha_category:
  - Switch
  - Plug
ha_domain: jasco
ha_integration_type: brand
works_with:
  - zwave
ha_platforms:
  - Switch
  - Plug
ha_iot_standard: zwave
ha_brand: true
---

[Jasco](https://byjasco.com/) is a member of the Works with Home Assistant partner program for their Z-Wave products. Jasco is committed to making sure their products are up-to-date and ready to use in Home Assistant.

Jasco Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)