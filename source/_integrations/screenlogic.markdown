---
title: Pentair ScreenLogic
description: Instructions on how to integrate a ScreenLogic gateway within Home Assistant.
ha_release: '2021.4'
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@dieselrabbit'
  - '@bdraco'
ha_domain: screenlogic
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
  - switch
ha_integration_type: hub
---

The **Pentair ScreenLogic** {% term integration %} allows you to integrate your Pentair IntelliTouch or EasyTouch pool controller with Home Assistant via the [Pentair ScreenLogic](https://www.pentair.com/products/residential/pool-spa-equipment/pool-automation/screenlogic2_interfaceforintellitouchandeasytouchautomationsystems.html) gateway.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}
