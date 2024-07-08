---
title: Medcom Bluetooth
description: Integrate International Medcom radiation monitors
ha_category:
  - Environment
  - Sensor
ha_release: '2023.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@elafargue'
ha_domain: medcom_ble
ha_bluetooth: true
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

Integrates International Medcom Bluetooth-enabled radiation monitors into Home Assistant.

[International Medcom](https://medcom.com/) is an American company that manufactures radiation detection instruments that are used in professional environments, for home and office, and by community projects worldwide.

This integration supports the Medcom [Inspector BLE](https://medcom.com/product/inspector-ble/) via a Bluetooth low-energy interface.

{% include integrations/config_flow.md %}

The Medcom Bluetooth integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and working. It will list each detected Inspector using its Bluetooth MAC address as the serial number.

To limit the load on the Bluetooth radio on the Home Assistant side, the integration only polls for a reading every 5 minutes, which should be adequate for ongoing background monitoring. An Inspector BLE battery should last several months with continuous use before needing replacement.

## Supported devices

- Medcom Inspector BLE

## Sensors

This integration adds a counts-per-minute ("CPM") sensor for each detected Inspector BLE device. See the Inspector BLE manual for how to convert this CPM reading into another unit if desired, which can be done via a custom [template sensor](/integrations/template)
