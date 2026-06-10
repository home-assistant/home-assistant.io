---
title: AirVisual Pro
description: Instructions on how to use AirVisual Pro devices within Home Assistant
ha_category:
  - Health
ha_release: 2023.1
ha_iot_class: Local Polling
ha_codeowners:
  - '@bachya'
ha_domain: airvisual_pro
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The **AirVisual Pro** {% term integration %} allows users to retrieve data from an [AirVisual Node/Pro unit](https://www.iqair.com/air-quality-monitors/airvisual-pro). Communication with the device occurs over the local network.

## Determining the Password

You will need the device's Samba password, which [can be found on the unit](https://support.iqair.com/en/articles/3029331-download-the-airvisual-node-pro-s-data-using-samba).

{% include integrations/config_flow.md %}

## Sensor types

AirVisual Pro {% term devices %} create a variety of {% term sensors %}:

- Air Quality Index (AQI)
- Battery Level
- Carbon Dioxide (CO2)
- Humidity
- Particulate (<= 0.1 μm) (PM0.1)
- Particulate (<= 2.5 μm) (PM2.5)
- Particulate (<= 10 μm) (PM10)
- Temperature
- Volatile Organic Compounds (VOC)
