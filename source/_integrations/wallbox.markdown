---
title: Wallbox
description: Instructions on how to integrate sensors Wallbox EV chargers to Home Assistant
ha_category:
  - Car
ha_release: 2021.4
ha_iot_class: Cloud Polling
ha_domain: wallbox
ha_platforms:
  - sensor
ha_config_flow: true
---

The Wallbiox integration pulls data from the [MyWallbox Portal](https://my.wallbox.com) for your Wallbox charging station.

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
