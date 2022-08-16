---
title: "air-Q"
description: "Instructions on how to integrate Air-Q into Home Assistant"
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2022.09'
ha_iot_class: "Local Polling"
ha_codeowners:
  - "@dl2080"
  - "@Sibgatulin"
ha_domain: airq
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

This platform allows to integrate the sensors, provided by your [Air-Q](https://www.air-q.com/) device, into Home Assistant.

{% include integrations/config_flow.md %}

During the configuration the user is prompted for the IP address of the device or the first 5 characters of the serial number, as well as the device password.

For this integration to communicate with the device, both must be connected to the same WiFi network.

## Sensors

Currently, the integration supports the following sensors:

| Sensor name          | Unit of measurement |
|----------------------|---------------------|
| CO                   | mg/m³               |
| CO2                  | ppm                 |
| Humidity[^rel]       | %                   |
| NO2                  | µg/m³               |
| Ozone                | µg/m³               |
| PM1, PM25, PM10[^pm] | µg/m³               |
| Pressure             | hPa                 |
| SO2                  | µg/m³               |
| Temperature          | °C                  |
| VOC[^voc]            | ppb                 |

[^rel]: Relative

[^pm]: Correspond to concentrations of particulates with diameter less than 1µm, 2.5µm, and 10µm respectively

[^voc]: Volatile organic compounds

After the setup, separate entities will be created for each of the aforementioned sensors, found in your device.
