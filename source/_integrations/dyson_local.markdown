---
title: Dyson Local
description: Instructions on how to integrate Dyson Local into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Vacuum
ha_iot_class: Local Push
ha_release: '2021.9'
ha_config_flow: true
ha_domain: dyson_local
ha_platforms:
  - binary_sensor
  - sensor
  - vacuum
ha_codeowners:
  - '@xiaonanshen'
---

Dyson Local uses MQTT-based protocol to communicate with local [Dyson](https://www.dyson.com) devices using credentials. Currently it supports

- Dyson 360 Eye robot vacuum

{% include integrations/config_flow.md %}

### Finding device WiFi information

To find the WiFi information of a device, you need to look for a sticker on the front or back of the user's manual. You can also find it on the body of the device:

- Dyson 360 Eye robot vacuum: behind the clear bin
