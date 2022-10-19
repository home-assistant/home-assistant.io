---
title: eQ-3 MAX!
description: Instructions on how to integrate eQ-3 MAX! components with Home Assistant via eQ-3 MAX! Cube.
ha_category:
  - Binary Sensor
  - Climate
ha_release: '0.40'
ha_iot_class: Local Polling
ha_domain: maxcube
ha_platforms:
  - binary_sensor
  - climate
ha_integration_type: integration
ha_config_flow: true
---

[eQ-3 MAX!](https://www.eq-3.com/products/homematic/detail/max-cube-lan-gateway.html) integration for Home Assistant allows you to connect eQ-3 MAX! components via the eQ-3 MAX! Cube. The components connects to the eQ-3 MAX! Cube via TCP and automatically makes all supported integrations available in Home Assistant. The name for each device is created by concatenating the MAX! room and device names.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate

Limitations:

- Configuring weekly schedules is not possible.
- Implementation is based on the reverse engineered [MAX! protocol](https://github.com/Bouni/max-cube-protocol).

Supported Devices:

- MAX! Radiator Thermostat (tested)
- MAX! Radiator Thermostat+
- MAX! Window Sensor (tested)
- MAX! Wall Thermostat (tested)

{% include integrations/config_flow.md %}

### Problems connecting or setting up 

Due to the connection limits of the eQ-3 MAX! Cube, Home Assistant will not be able to connect to the gateway if another application is still connected. It may result in timeout errors like _Error: timed out You will need to restart Home Assistant after fixing._ and  _The following integrations and platforms could not be set up: maxcube Please check your configuration._

To prevent these issues, ensure all other applications connecting to the gateway are closed, e.g., the mobile app or the MAX! desktop app (On Windows machines, close from the status bar, it keeps running when you close the browser window).
