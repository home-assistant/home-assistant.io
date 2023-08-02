---
title: Gardena Bluetooth
description: Instructions on how to integrate Gardena Bluetooth devices within Home Assistant.
ha_category:
  - Binary Sensor
  - Number
  - Sensor
  - Switch
ha_release: '2023.8'
ha_iot_class: Local Polling
ha_codeowners:
  - '@elupus'
ha_domain: gardena_bluetooth
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The Gardena Bluetooth integration allows users to integrate their [Gardena Smart](https://www.gardena.com/int/products/smart/) devices using Bluetooth into Home Assistant.

The integration supports the [Water Control](#water-control) devices within Home Assistant:

{% include integrations/config_flow.md %}

## Water Control

Allow control of the valve state of [Gardena Bluetooth Water Control](https://www.gardena.com/int/products/watering/water-controls/water-control-bluetooth) units.

The paring of the device may require a [Factory Reset](#factory-reset) before it allows a connection.

### Limitations

- Control of offline scheduling settings is not supported.

### Factory Reset

1. Remove the battery.
2. Push and hold Man. button and reinsert the battery.
3. Hold the button for approx. 10 seconds.
