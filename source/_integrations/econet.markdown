---
title: Rheem EcoNet Products
description: Instructions on how to integrate Rheem EcoNet water heaters into Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Sensor
  - Water Heater
ha_release: 0.61
ha_iot_class: Cloud Push
ha_domain: econet
ha_codeowners:
  - '@vangorra'
  - '@w1ll1am23'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
  - water_heater
---

The EcoNet integrations is consuming the information provided by a [EcoNet enabled Rheem water heater or thermostat](https://www.rheem.com/EcoNet/Home).

{% include integrations/config_flow.md %}

## Platforms

EcoNet devices may be represented by one or more platforms.

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Water Heater](#water-heater)

### Binary Sensor

The EcoNet Binary Sensor platform lets you view binary states of sensors associated with your EcoNet thermostat or water heater. For example, if the device is currently running.

### Climate

The EcoNet Climate platform lets you control your EcoNet thermostat. Multi-zone HVAC systems will have 1 Climate entity per zone.

### Sensor

The EcoNet Sensor platform lets you view sensors associated with your EcoNet thermostat or water heater. For example, alert count or available hot water.

### Water Heater

The EcoNet Water Heater platform lets you control your EcoNet water heater. Water Heaters do not report the current water temperature.
