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

The Govee BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. No account credentials or API key is required.

## Supported devices
Please note that this integration exclusively supports Bluetooth-compatible Govee sensors. Govee lights and appliances are not supported.
### Thermohygrometers
- H5074 Bluetooth Thermo-Hygrometer Lite
- [H5075 Bluetooth Thermo-Hygrometer](https://us.govee.com/collections/thermo-hydrometer/products/govee-bluetooth-hygrometer-thermometer-h5075)
- [H5177 Bluetooth Thermo-Hygrometer](https://us.govee.com/collections/thermo-hydrometer/products/bluetooth-thermo-hygrometer)
- H5178 Bluetooth Thermo-Hygrometer
- [H5179 WiFi + Bluetooth Thermo-Hygrometer](https://us.govee.com/collections/govee-home-accessories/products/wi-fi-temperature-humidity-sensor)
### Meat Thermometers
- H5181 Smart Meat Thermometer
- H5183 Smart Meat Thermometer
- H5185 Smart Meat Thermometer
