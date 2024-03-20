---
title: Fläktgroup Integration
description: Instructions on how to integrate Fläktgroup devices with Home Assistant via Modbus.
ha_category:
  - Climate
  - Sensor
  - Binary sensor
ha_release: 2023.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@volodymyrpavlenko'
ha_domain: flaktgroup
ha_zeroconf: true
ha_platforms:
  - climate
  - sensor
  - binary_sensor
ha_integration_type: integration
---

[Fläktgroup](https://flaktgroup.com/) allows you to control your FTX equipment via Modbus.

There is currently support for the following device types within Home Assistant:

- Climate
- Sensor
- Binary sensor

The integration allows control of fan speeds, 

This integration allows users to:

- Monitor Fläktgroup system parameters (tested with RDKS):
  - Outdoor, Supply, Extract temperature
  - Supply, Extract humidity
  - Air Quality (CO2 ppm)
- Control system parameters:
  - Supply fan configuration
  - Extract fan configuration
  - Temperature configuration
  - Air Quality configuration

{% include integrations/config_flow.md %}

## Debugging integration

If you have problems with the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.flaktgroup: debug
```
