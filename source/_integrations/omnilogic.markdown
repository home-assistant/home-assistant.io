---
title: Hayward Omnilogic
description: Instructions on how to configure Hayward OmniLogic integration.
ha_category:
  - Sensor
  - Switch
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: omnilogic
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
---

[Hayward OmniLogic](https://www.hayward-pool.com/shop/en/pools/omnilogic-i-auomni--1) smart pool and spa technology control.

There is currently support for the following device types within Home Assistant:

- ***Sensor*** - Air Temperature, Water Temperature, Variable Pump Speed, Chlorinator Setting, Salt Level, pH, and ORP
- ***Switch*** - All relays, pumps (single, dual, variable speed), and relay-based lights.

{% include integrations/config_flow.md %}

## Known limitations

- The platform only supports sensors and switches at the current release. Future releases will include light/water heater for control of Colorlogic lights and pool heaters.

## Debugging integration

If you have problems with the integration you can add debug prints to the log to aid in troubleshooting.

```yaml
logger:
  default: info
  logs:
    omnilogic: debug
    homeassistant.components.omnilogic: debug
