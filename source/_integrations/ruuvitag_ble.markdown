---
title: RuuviTag BLE
description: Instructions on how to integrate RuuviTag BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.12'
ha_iot_class: Local Push
ha_codeowners:
  - '@akx'
ha_domain: ruuvitag_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Ruuvi](https://ruuvi.com/)'s RuuviTag BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The RuuviTag BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

If your RuuviTags are not discovered, please make sure to update them to [the latest firmware](https://ruuvi.com/software-update/).

## Supported devices

- [RuuviTag](https://ruuvi.com/ruuvitag/)
