---
title: RAPT Pill BLE
description: Instructions on how to integrate RAPT Pill Hydrometers configured in Bluetooth mode into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2023.03'
ha_iot_class: Local Push
ha_codeowners:
  - '@sairon'
ha_domain: rapt_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [RAPT Pill](https://www.kegland.com.au/rapt-pill-hydrometer-thermometer-wifi-bluetooth.html) hydrometers into Home Assistant.

{% include integrations/config_flow.md %}

The RAPT Pill BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. RAPT Pill must be switched to the Bluetooth mode in Settings - Telemetry method. See the [user manual](https://www.kegland.com.au/media/pdf/KL20596%20-%20RAPT%20Pill%20Hydrometer%20and%20Thermometer%20Quick%20Start%20Guide.pdf) for detailed instructions.

## Supported devices

- [RAPT Pill Hydrometer & Thermometer](https://www.kegland.com.au/rapt-pill-hydrometer-thermometer-wifi-bluetooth.html)
