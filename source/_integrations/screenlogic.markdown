---
title: Pentair ScreenLogic
description: Instructions on how to integrate a ScreenLogic gateway within Home Assistant.
ha_release: '2021.4'
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@dieselrabbit'
ha_domain: screenlogic
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - switch
---

The Pentair ScreenLogic integration allows you to integrate your Pentair Intellitouch or EasyTouch pool controller with Home Assistant via the [Pentair ScreenLogic](https://www.pentair.com/en-us/products/residential/pool-spa-equipment/pool-automation/screenlogic2_interfaceforintellitouchandeasytouchautomationsystems.html) gateway.

{% include integrations/config_flow.md %}

## Options

ScreenLogic options are set via **Configuration** -> **Integrations** -> **Pentair ScreenLogic** -> **Options**.

* Seconds between scans - How many seconds between each polling of the ScreenLogic gateway.
