---
title: Aeroflex Adjustable Bed
description: Instructions on how to integrate Aeroflex adjustable beds into Home Assistant.
ha_category:
  - Number
ha_bluetooth: true
ha_release: 2025.04
ha_iot_class: Calculated
ha_codeowners:
  - '@iddora'
ha_domain: aeroflex
ha_config_flow: true
ha_platforms:
  - number
ha_integration_type: integration
---

The Aeroflex integration allows you to control and monitor your Aeroflex adjustable bed through Bluetooth Low Energy (BLE).

## Supported Features

The integration provides the following features:

- Control head and feet positions

## Entities

### Number

- **Head Angle**: Adjust the head section angle (0-60°)
- **Feet Angle**: Adjust the feet section angle (0-30°)