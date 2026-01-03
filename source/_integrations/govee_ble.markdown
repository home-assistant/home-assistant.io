---
title: Govee Bluetooth
description: Instructions on how to integrate Govee BLE devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Event
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: govee_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - event
  - sensor
ha_integration_type: integration
---

Integrates [Govee](https://www.govee.com/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The Govee BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- H5051 Hygrometer Thermometer
- H5052 Hygrometer Thermometer
- H5071 Hygrometer Thermometer
- H5072 Hygrometer Thermometer
- H5074 Hygrometer Thermometer
- [H5075 Bluetooth Hygrometer Thermometer](https://us.govee.com/collections/thermo-hydrometer/products/govee-bluetooth-hygrometer-thermometer-h5075)
- [H5100 Hygrometer Thermometer](https://us.govee.com/collections/thermo-hydrometer/products/govee-h5100-mini-hygrometer-thermometer-sensors)
- H5101 Hygrometer Thermometer
- H5102 Hygrometer Thermometer
- H5103 Hygrometer Thermometer
- [H5104 Hygrometer Thermometer](https://us.govee.com/products/goveelife-bluetooth-hygrometer-thermometer-h5104-white)
- H5105 Hygrometer Thermometer
- H5106 Hygrometer Thermometer and Air Quality Monitor
- H5108 Hygrometer Thermometer
- H5121 Motion Sensor
- H5122 Mini Button
- H5123 Window Sensor
- H5124 Vibration Sensor
- H5125 2 Button Switch
- H5126 6 Button Switch
- H5127 Presence Sensor
- H5130 Pressure Sensor
- [H5177/5178 Bluetooth Thermo-Hygrometer](https://us.govee.com/collections/thermo-hydrometer/products/bluetooth-thermo-hygrometer)
- H5174 Hygrometer Thermometer
- [H5179 Hygrometer Thermometer](https://us.govee.com/products/wi-fi-temperature-humidity-sensor)
- 5055 Meat Thermometer
- 5181 Meat Thermometer
- 5182 Meat Thermometer
- 5183 Meat Thermometer
- 5184 Meat Thermometer
- 5185 Meat Thermometer
- 5198 Meat Thermometer
