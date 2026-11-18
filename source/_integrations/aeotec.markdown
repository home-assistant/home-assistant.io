---
title: Aeotec
description: Connect and control your Aeotec Z-Wave and Zigbee devices using the Z-Wave and Zigbee integrations
ha_release: '2026.12'
ha_iot_class: Local Push
ha_categories:
  - sensors
  - security_safety
  - buttons_remotes
ha_domain: aeotec
ha_integration_type: brand
works_with:
  - zwave
  - zigbee
ha_platforms:
  - binary_sensor
  - event
  - sensor
  - siren
  - switch
ha_iot_standard:
  - zwave
  - zigbee
ha_brand: true
---

{% include integrations/wwha.md url="https://aeotec.com/" %}

## Works with Home Assistant certified devices

{% include integrations/device_list.html brand="aeotec" %}
