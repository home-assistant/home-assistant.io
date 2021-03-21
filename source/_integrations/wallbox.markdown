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
---

This `wallbox` sensor platform pulls data from https://my.wallbox.com for your wallbox charging station.

## Configuration

To enable this sensor in your installation, go to Configuration and Integrations and add a MyWallbox integration. You will need to fill in your wallbox:
- serial number
-  your username (email)
-  password

Add multiple wallboxes by renaming the integration after adding and choosing an unique and descriptive name.

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
