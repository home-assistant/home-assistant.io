---
title: OSO Energy
description: Instructions on how to integrate OSO Energy devices with Home Assistant.
ha_release: '2024.1'
ha_category:
  - Binary sensor
  - Sensor
  - Water Heater
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@osohotwateriot'
ha_domain: osoenergy
ha_platforms:
  - binary_sensor
  - sensor
  - water_heater
ha_config_flow: true
ha_integration_type: integration
---

The OSO Energy integration for Home Assistant allows you to interact with supported devices and services offered by [OSO Energy](https://www.osoenergy.no)

This OSO Energy integration uses a subscription key, which a user can create for his account on the [OSO Energy website](https://portal.osoenergy.no/), to configure it within Home Assistant. Once configured Home Assistant will detect and add all OSO Energy devices.

{% include integrations/config_flow.md %}

## Binary sensors

The **OSO Energy** integration exposes OSO Energy data as a binary sensor. It provides the following binary sensors:

- Extra energy
  - Indication if the water heater is currently in an extra energy/high demand state.
- Power save
  - Indication if the water heater is currently in a power save/sleep mode state.
- Heating
  - Indication if the water heater is currently heating the water.

## Sensors

The **OSO Energy** integration exposes OSO Energy data as a sensor. It provides the following sensors:

- Heater Mode for water heaters.
  - Indication of the current heater mode on the device.
- Optimization Mode for water heaters.
  - Indication of the way heating is managed by the device according to external factors. For example, electricity prices.
- Power load (kW) for water heaters.
  - Indication of the current power load of the water heater - how much energy is currently drawn out of the electricity grid.
- Tapping capacity (kWh) for water heaters.
  - Indication for quantity of energy that is stored and available for use at the moment - the current kWh equivalent capacity of the water heater.
- Capacity mixed water at 40°C (L) for water heaters.
  - Indication of the current quantity of water that can be drained out after mixing the water in the heater with the inlet tap water to produce water at 40°C.
- V40 Min (L) for water heaters.
  - The current minimum allowed quantity of mixed water at 40°C. When the current capacity drops below this threshold, the heater will turn on as a feature to guard against cold water.
- Minimum Level of V40 Min (L) for water heaters.
  - The lower boundary of the V40 Min sensor that can be achieved during normal operation of the water heater. Can vary depending on the type of the heater.
- Maximum Level of V40 Min (L) for water heaters.
  - The upper boundary of the V40 Min sensor that can be achieved during normal operation of the water heater. Can vary depending on the type of the heater.
- Temperature top
  - The current measured temperature of the water from the top sensor of the water heater.
- Temperature middle
  - The current measured temperature of the water from the middle sensor of the water heater.
- Temperature bottom
  - The current measured temperature of the water from the bottom segment of the water heater.
- Temperature one
  - The current measured temperature of the water from the one wire sensor of the water heater.

## Water heater

The OSO Energy water heater integration integrates your OSO Energy devices into Home Assistant.

It supports the following OSO Energy devices:

- Water Heaters
- Sensors
