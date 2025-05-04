---
title: Third Reality
description: Connect and control your Third Reality Zigbee devices using the Zigbee integration
ha_release: '2022.10'
ha_iot_class: Local Push
ha_category:
  - Cover
  - Switch
  - Binary sensor
  - Light
  - Sensor
  - Button
ha_domain: third_reality
ha_integration_type: integration
works_with:
  - zigbee
  - matter
ha_platforms:
  - binary_sensor
  - button
  - light
  - sensor
  - switch
  - cover
ha_iot_standard:
  - zigbee
  - matter
ha_brand: true
---

[Third Reality](https://3reality.com) is a member of the Works with Home Assistant partner program for their Zigbee and Matter products. Third Reality is committed to making sure their products are up-to-date and ready to use in Home Assistant.

Third Reality Zigbee devices work locally and integrate seamlessly with the Zigbee integration in Home Assistant (Zigbee stick required).

To add Third Reality products, pair them as Zigbee or Matter devices, depending on which you have purchased:

{% my add_zigbee_device badge brand=page.ha_domain %}

[Learn more about Zigbee in Home Assistant.](/integrations/zha/)

Third Reality Matter devices work locally and integrate seamlessly with the Matter integration in Home Assistant. As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_matter_device badge domain=page.ha_domain %}

[Learn more about Matter in Home Assistant.](/integrations/matter/)
