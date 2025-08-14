---
title: Rituals Perfume Genie
description: Instructions on how to integrate Rituals Perfume Genie diffusers within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2021.3
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@milanmeu'
  - '@frenck'
ha_domain: rituals_perfume_genie
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The Rituals Perfume Genie integration allows you to control and monitor your Rituals perfume diffusers connected to your Rituals account. The integration is compatible with the first and second `2.0` versions.

{% include integrations/config_flow.md %}
