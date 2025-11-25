---
title: LOOKin
description: Instructions on how to integrate LOOKin devices into Home Assistant.
ha_category:
  - Climate
  - Light
  - Media player
  - Sensor
ha_release: 2021.11
ha_iot_class: Local Push
ha_codeowners:
  - '@ANMalko'
  - '@bdraco'
ha_domain: lookin
ha_config_flow: true
ha_platforms:
  - climate
  - light
  - media_player
  - sensor
ha_zeroconf: true
ha_integration_type: integration
---

Integrates LOOKin devices into Home Assistant.

[LOOKin](https://look-in.club/devices) focuses on providing devices that integrate with a local api and can be used internet free.

### Supported devices

[LOOKin Remote2](https://look-in.club/store/remote2): internet free Wi-Fi+IR Smart Home Control

{% include integrations/config_flow.md %}
