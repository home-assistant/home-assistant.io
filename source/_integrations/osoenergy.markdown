---
title: OSO Energy
description: Instructions on how to integrate OSO Energy devices with Home Assistant.
ha_release: '2024.1'
ha_category:
  - Sensor
  - Water Heater
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@osohotwateriot'
ha_domain: osoenergy
ha_platforms:
  - water_heater
ha_config_flow: true
ha_integration_type: integration
---

The OSO Energy integration for Home Assistant allows you to interact with supported devices and services offered by [OSO Energy](https://www.osoenergy.no)

This OSO Energy integration uses a subscription key, which a user can create for his account on the [OSO Energy website](https://portal.osoenergy.no/), to configure it within Home Assistant. Once configured Home Assistant will detect and add all OSO Energy devices.

{% include integrations/config_flow.md %}

## Platforms

### Sensor

The `osoenergy` sensor integration exposes OSO Energy data as a sensor.

The platform exposes the following sensors:

- Heater Mode for water heaters.
- Optimization Mode for water heaters.
- Power load (kW) for water heaters.
- Tapping capacity (kWh) for water heaters.
- Capacity mixed water at 40°C (L) for water heaters.
- V40 Min (L) for water heaters.
- Minimum Level of V40 Min (L) for water heaters.
- Maximum Level of V40 Min (L) for water heaters.
- Profile - 24 hour array of the target temperatures for water heaters.
- Each hour is represented by the index. For example - index 10 if for 10:00 local user time.

### Water Heater

The OSO Energy water heater platform integrates your OSO Energy devices into Home Assistant.

The platform supports the following OSO Energy devices:

- Water Heaters
- Sensors
