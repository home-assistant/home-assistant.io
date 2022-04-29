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

The Wallbox integration pulls data from the [MyWallbox Portal](https://my.wallbox.com) for your Wallbox charging station.

{% include integrations/config_flow.md %}

## Sensors

The integration adds the following sensors:

- Added Energy
- Added Range
- Charging Power
- Charging Speed
- Charging Time
- Cost
- Current Mode
- Depot Price
- Max Available Power
- State of Charge
- Status Description
- Max Charging Current

## Number

The integration adds the following number entity:

- Max Charging Current

The number entity is only loaded if the supplied username has sufficient rights to change the Max. Charging Current.

## Lock

The integration adds a lock entity, allowing you to lock the charger. Please note, this only works with a user with admin rights.

## Switch

The integration adds a switch entity, allowing you to pause/resume the charging process.
