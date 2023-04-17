---
title: RAPT Bluetooth
description: Instructions on how to integrate RAPT Pill Hydrometers configured in Bluetooth mode into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2023.5
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

The RAPT Pill BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. RAPT Pill must be switched to the Bluetooth mode in Settings - Telemetry method. See the [user manual](https://cdn.shopify.com/s/files/1/0667/3019/7248/files/KL20596_-_RAPT_Pill_Hydrometer_and_Thermometer_Quick_Start_Guide.pdf) for detailed instructions.

## Supported devices

- [RAPT Pill Hydrometer & Thermometer](https://www.kegland.com.au/rapt-pill-hydrometer-thermometer-wifi-bluetooth.html)
