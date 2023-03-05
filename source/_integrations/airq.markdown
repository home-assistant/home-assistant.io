---
title: air-Q
description: Instructions on how to integrate air-Q into Home Assistant
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2022.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@Sibgatulin'
  - '@dl2080'
ha_domain: airq
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: hub
---

This integration allows integrating the sensors, provided by your [air-Q](https://www.air-q.com/) device, into Home Assistant.

{% include integrations/config_flow.md %}

During the configuration, the user is prompted for the IP address of the device or the first 5 characters of the serial number, as well as the device password.

For this integration to communicate with the device, both must be connected to the same Wi-Fi network.

## Sensors

Currently, the integration supports the following sensors:

| Sensor name          | Unit of measurement |
|----------------------|---------------------|
| Ammonia              | µg/m³               |
| Chlorine             | µg/m³               |
| CO                   | mg/m³               |
| CO2                  | ppm                 |
| Dew Point            | °C                  |
| Ethanol              | µg/m³               |
| Formaldehyde         | µg/m³               |
| H2S                  | µg/m³               |
| Health Index         | %                   |
| Humidity (relative)  | %                   |
| Absolute Humidity    | g/m³                |
| Hydrogen             | µg/m³               |
| Methane              | %                   |
| N2O                  | µg/m³               |
| NO                   | µg/m³               |
| NO2                  | µg/m³               |
| Ozone                | µg/m³               |
| Oxygen               | µg/m³               |
| Performance Index    | %                   |
| PM1, PM25, PM10[^pm] | µg/m³               |
| Pressure             | hPa                 |
| Relative Pressure    | hPa                 |
| Propane              | %                   |
| SO2                  | µg/m³               |
| Noise                | dBa                 |
| Noise (Maximum)      | dBa                 |
| Radon                | Bq/m³               |
| Temperature          | °C                  |
| VOC                  | ppb                 |
| VOC (Industrial)     | ppb                 |

PM1, PM25, and PM10 correspond to concentrations of particulates with diameter less than 1µm, 2.5µm, and 10µm respectively

After the setup, separate entities will be created for each of the aforementioned sensors, found in your device.
