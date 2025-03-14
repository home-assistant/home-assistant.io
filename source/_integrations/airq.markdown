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

The **air-Q** {% term integration %} allows integrating the sensors, provided by your [air-Q](https://www.air-q.com/) device, into Home Assistant.

{% include integrations/config_flow.md %}

During the initial configuration, the user is prompted for the IP address of the {% term device %} or the first 5 characters of the serial number, as well as the device password.


For this integration to communicate with the device, both must be connected to the same Wi-Fi network.

After the setup, separate {% term entities %} will be created for each of the {% term sensors %}, found in your {% term device %}.

## Sensors

Currently, the integration supports the following sensors:

| Sensor name          | Unit of measurement |
|----------------------|---------------------|
| Acetaldehyde         | µg/m³               |
| Ammonia              | µg/m³               |
| Arsine               | µg/m³               |
| Bromine              | µg/m³               |
| CH4S                 | µg/m³               |
| Chlorine             | µg/m³               |
| ClO2                 | µg/m³               |
| CO                   | mg/m³               |
| CO2                  | ppm                 |
| CS2                  | µg/m³               |
| Dew Point            | °C                  |
| Ethanol              | µg/m³               |
| Ethylene             | µg/m³               |
| Formaldehyde         | µg/m³               |
| F2                   | µg/m³               |
| H2S                  | µg/m³               |
| HCl                  | µg/m³               |
| HCN                  | µg/m³               |
| HF                   | µg/m³               |
| Health Index         | %                   |
| Humidity (relative)  | %                   |
| Absolute Humidity    | g/m³                |
| Hydrogen             | µg/m³               |
| Hydrogen Peroxide    | µg/m³               |
| Methane              | %                   |
| N2O                  | µg/m³               |
| NO                   | µg/m³               |
| NO2                  | µg/m³               |
| Organic Acid         | ppb                 |
| Oxygen               | µg/m³               |
| Ozone                | µg/m³               |
| Performance Index    | %                   |
| PH3                  | µg/m³               |
| PM1, PM25, PM10      | µg/m³               |
| Pressure             | hPa                 |
| Relative Pressure    | hPa                 |
| Propane              | %                   |
| Refrigerant          | µg/m³               |
| SiH4                 | µg/m³               |
| SO2                  | µg/m³               |
| Noise                | dBa                 |
| Noise (Maximum)      | dBa                 |
| Radon                | Bq/m³               |
| Temperature          | °C                  |
| Virus Index          | %                   |
| VOC                  | ppb                 |
| VOC (Industrial)     | ppb                 |

PM1, PM25, and PM10 correspond to concentrations of particulates with diameter less than 1µm, 2.5µm, and 10µm respectively

Virus Index uses CO2 as a proxy for potential aerosol load and can be seen as an indicator of ventilation sufficiency (0 %: insufficient ventilation, 100 %: all fine).

Virtual sensors "Relative Pressure" and "Virus Index" are introduced in firmware v1.80.0 but deactivated by default. You can activate them in the air-Q mobile application under "Advanced settings".

## Additional configuration

After the integration has been initialized, the user can configure any of the following two parameters:

- **Show values averaged by the device**. Default: `on`. In its default configuration, air-Q averages the stream of sensor values. The strength of this averaging can be configured on the device side (not exposed through the HA). However, this integration allows to switch between polling the averaged and the raw data from the device. To poll noisy sensor readings from the device, set **Show values averaged by the device** to `off`.

- **Clip negative values**. Default: `on`. For baseline calibration purposes, certain sensor values may briefly become negative. The default behavior is to clip such values to 0.

## Troubleshooting

For troubleshooting or when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue reoccurs stop the debug logging, which will trigger the download of the debug log file.
Enabling debug logging has a slight performance impact on the system and is not recommended for long-term use.
