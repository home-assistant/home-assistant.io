---
title: FrankEver
description: Connect and control your FrankEver devices using the Shelly integration
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Energy
  - Event
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Text
  - Update
  - Valve
ha_release: 0.115
ha_domain: frankever
ha_integration_type: virtual
ha_supporting_domain: shelly
ha_supporting_integration: Shelly
ha_codeowners:
  - '@balloob'
  - '@bieniu'
  - '@thecode'
  - '@chemelli74'
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - light
  - number
  - select
  - sensor
  - switch
  - text
  - update
  - valve
ha_iot_class: Local Push
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
