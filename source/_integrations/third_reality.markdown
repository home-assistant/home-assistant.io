---
title: Third Reality
description: Connect and control your Third Reality Zigbee devices using the Zigbee integration
ha_release: '2021.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_category:
  - Cover
  - Switch
  - Binary Sensor
  - Button
ha_domain: third_reality
ha_integration_type: integration
works_with:
  - zigbee
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - switch
ha_supporting_domain: zha
ha_supporting_integration: Zigbee
---

[Third Reality](https://3reality.com) is a member of the Works with Home Assistant partner program for their Zigbee products. Third Reality is committed to making sure their products are up-to-date and ready to use in Home Assistant.

Third Reality Zigbee devices work locally and integrate seamlessly with the Zigbee integration in Home Assistant (Zigbee stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant. Each device that is connected to power will also act as a Zigbee router to extend your Zigbee mesh network.

{% include integrations/config_flow.md domain=page.ha_supporting_domain %}
<br><br>
To find more information, please use the [Zigbee integration](/integrations/zha) page.
