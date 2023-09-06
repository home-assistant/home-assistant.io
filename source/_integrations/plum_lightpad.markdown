---
title: Plum Lightpad
description: Instructions on setting up Plum Lightpads within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_release: 0.85
ha_domain: plum_lightpad
ha_codeowners:
  - '@ColinHarrington'
  - '@prystupa'
ha_platforms:
  - light
ha_integration_type: integration
---

Configurable/Dimmable Wi-Fi Lightswitch
- Cloud registered, Local API communication (both RESTful and TCP pushed events)
- Motion Sensor
- Energy Meter
- RGB Glow Ring
- Wi-Fi & Bluetooth connectivity
- Phone Apps for iOS & Android

{% include integrations/config_flow.md %}
