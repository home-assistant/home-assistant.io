---
title: SenseME
description: Instructions on how to integrate SenseME devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Fan
  - Light
  - Select
  - Switch
ha_dhcp: true
ha_release: 2022.2
ha_iot_class: Local Push
ha_codeowners:
  - '@mikelawrence'
  - '@bdraco'
ha_domain: senseme
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - fan
  - light
  - select
  - switch
ha_integration_type: integration
---

Integrates SenseME devices into Home Assistant.

The SenseME integration supports devices that speak the [SenseME](https://www.bigassfans.com/senseme/) protocol.

### Supported devices

- Haiku Fans with SenseME
- Haiku Lights with SenseME (discontinued)

{% include integrations/config_flow.md %}
