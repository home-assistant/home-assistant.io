---
title: Z-Box Hub
description: Connect and control your devices connected to a Z-Box Hub using the Fibaro integration
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Event
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: 2025.8
ha_domain: zbox_hub
ha_integration_type: virtual
ha_supporting_domain: fibaro
ha_supporting_integration: Fibaro
ha_codeowners:
  - '@rappenze'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - event
  - light
  - lock
  - scene
  - sensor
  - switch
ha_iot_class: Local Push
---

Integrates [Z-Box Hub](https://zboxhub.com/) into Home Assistant.

{% include integrations/supported_brand.md %}
