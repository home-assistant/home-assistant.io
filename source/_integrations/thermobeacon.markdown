---
title: ThermoBeacon
description: Instructions on how to integrate ThermoBeacon devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: thermobeacon
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [ThermoBeacon](http://www.seven-like.com/) devices into Home Assistant.

## Supported devices

- SensorBlue WS03
- SensorBlue WS07
- SensorBlue WS08

The ThermoBeacon integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
