---
title: LOOKin
description: Instructions on how to integrate LookIN devices into Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2021.11
ha_iot_class: Local Push
ha_codeowners:
  - '@ANMalko'
ha_domain: lookin
ha_config_flow: true
ha_platforms:
  - climate
  - sensor
ha_zeroconf: true
---

Integrates LOOKin devices into Home Assistant.

[LOOKin](https://look-in.club/en/devices) focuses on providing devices that integrate with a local api and can be used internet free.

### Supported devices

LOOKin Remote2: internet free Wi-Fi+IR Smart Home Control

{% include integrations/config_flow.md %}
