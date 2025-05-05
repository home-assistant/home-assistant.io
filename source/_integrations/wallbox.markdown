---
title: Wallbox
description: Instructions on how to integrate sensors Wallbox EV chargers to Home Assistant
ha_category:
  - Car
ha_release: 2021.6
ha_iot_class: Cloud Polling
ha_domain: wallbox
ha_platforms:
  - lock
  - number
  - sensor
  - switch
ha_config_flow: true
ha_codeowners:
  - '@hesselonline'
ha_integration_type: integration
---

The **Wallbox** {% term integration %} pulls data from the [MyWallbox Portal](https://my.wallbox.com) for your Wallbox charging station.

{% include integrations/config_flow.md %}

## Sensors

The {% term integration %} adds the following sensors:

- Added energy (kWh)
- Added range (km)
- Charging power (kW)
- Charging speed
- Charging time
- Cost ([default currency])
- Current mode
- Depot price ([default currency]/kWh)
- Energy price ([default currency]/kWh)
- Max available power (A)
- State of charge (%)
- Status description
- Max charging current (A)
- Max ICP current (A)

## Number

The {% term integration %} adds the following number entities:

- Max charging current (A)
- Max ICP current; this is the maximum current available for load balancing (A)
- Energy price ([default currency]/kWh)

The number {% term entity %} is only loaded if the supplied username has sufficient rights to change the Max. Charging Current.

## Lock

The {% term integration %} adds a lock {% term entity %}, allowing you to lock the charger. Please note, this only works with a user with admin rights.

## Switch

The {% term integration %} adds a switch {% term entity %}, allowing you to pause/resume the charging process.
