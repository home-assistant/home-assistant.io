---
title: Ruuvi BLE
description: Instructions on how to integrate Ruuvi BLE devices into Home Assistant.
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

Integrates [Ruuvi](https://ruuvi.com/)'s RuuviTag and Ruuvi Air BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The Ruuvi BLE integration will automatically discover supported devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

If your Ruuvi devices are not discovered, please make sure to update them to [the latest firmware](https://ruuvi.com/software-update/).

## Supported devices

- [RuuviTag](https://ruuvi.com/ruuvitag/) - Environmental sensor tags
- [RuuviTag Pro](https://ruuvi.com/ruuvitag-pro/) - Heavy-duty environmental sensor tags
- [Ruuvi Air](https://ruuvi.com/air/) - Air quality monitors (since Home Assistant 2025.11)
