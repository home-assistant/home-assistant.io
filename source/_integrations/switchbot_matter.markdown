---
title: SwitchBot Matter
description: Connect and control your SwitchBot Matter devices using the Matter integration
ha_release: '2025.6'
ha_iot_class: Local Push
ha_category:
  - Cover
  - Lock
  - Sensor
  - Switch
ha_domain: switchbot
ha_integration_type: brand
works_with:
  - matter
ha_platforms:
  - binary_sensor
  - cover
  - lock
  - sensor
  - switch
ha_iot_standard: matter
ha_brand: true
---

{% include integrations/wwha.md url="https://www.switch-bot.com/" %}

## Works with Home Assistant certified devices

SwitchBot Matter devices are certified for use via one of their Matter hubs: either the [SwitchBot Hub 2](https://www.switch-bot.com/products/switchbot-hub-2) or the [Hub 3](https://www.switch-bot.com/products/switchbot-hub-3). Some are also certified via Matter over Wi-Fi as standalone devices.

### Via a Matter hub

{% include integrations/device_list.html brand="SwitchBot" protocol="Vendor Hub / Bridge" %}

### Matter over Wi-Fi (standalone, without requiring a hub)

{% include integrations/device_list.html brand="SwitchBot" protocol="Matter over WiFi" %}

## Other supported devices

In addition to the certified devices, the following devices are also supported:

- [SwitchBot Lock Ultra](https://www.switch-bot.com/products/switchbot-lock_ultra) (via a Matter hub)
- [SwitchBot Motion Sensor](https://www.switch-bot.com/products/motion-sensor) (via a Matter hub)
- [SwitchBot Multitasking Robot K11+](https://www.switch-bot.com/products/switchbot-robot-vacuum-k11) (Matter over Wi-Fi)
