---
title: Govee Bluetooth
description: Instructions on how to integrate Govee BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: govee_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Govee](https://www.govee.com/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The Govee BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- H5071 Hygrometer Thermometer
- H5072 Hygrometer Thermometer
- H5074 Hygrometer Thermometer
- [H5075 Bluetooth Hygrometer Thermometer](https://us.govee.com/collections/thermo-hydrometer/products/govee-bluetooth-hygrometer-thermometer-h5075)
- H5100 Hygrometer Thermometer
- H5101 Hygrometer Thermometer
- [H5177/5178 Bluetooth Thermo-Hygrometer](https://us.govee.com/collections/thermo-hydrometer/products/bluetooth-thermo-hygrometer)
- H5179 Hygrometer Thermometer
- 5181 Meat Thermometer
- 5183 Meat Thermometer
- 5184 Meat Thermometer
- 5185 Meat Thermometer
