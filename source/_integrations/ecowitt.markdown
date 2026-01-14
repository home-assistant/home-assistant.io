---
title: Ecowitt
description: Instructions on how to integrate Ecowitt Weather Station within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Weather
ha_release: 2022.9
ha_iot_class: Local Push
ha_domain: ecowitt
ha_config_flow: true
ha_codeowners:
  - '@pvizeli'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: device
---

The **Ecowitt** {% term integration %} allows you to integrate [Ecowitt](https://www.ecowitt.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

## Ecowitt Weather Station configuration

The **Ecowitt** {% term integration %} works by first creating a callback endpoint on your Home Assistant instance and then adding this configuration to the Ecowitt console so that it starts sending data.

The integration will display a Server IP / Host Name, Path, and Port. You can input it into the Ecowitt configuration in one of two ways:

1. Use the Ecowitt App (on your phone):
    - Select the Menu Icon ({% icon "mdi:menu" %}) on the upper left, then **My Devices** → **Pick your station**
    - Select the Ellipsis Icon ({% icon "mdi:dots-horizontal" %}) → **Others**
    - Select **DIY Upload Servers** → **Customized**
    - Make sure to choose 'Protocol Type Same As: Ecowitt'
    - Enter the Server IP / Host Name, Path, and Port from the integration. _Note: The path has to match! Remove the first forward slash from the path, as the app will prepend one._
    - Save
1. Navigate to the Ecowitt web UI in a browser at the station IP address:
    - Select **Weather Services** then scroll down to 'Customized'
    - Make sure to select 'Customized: 🔘 Enable' and 'Protocol Type Same As: 🔘 Ecowitt'
    - Enter the Server IP / Host Name, Path, and Port from the integration.
    - Save

## Supported functionality

The **Ecowitt** {% term integration %} provides the following {% term entities %}. Available entities depend on which sensors are connected to your weather station.

### Binary sensors

- **Battery status**: Indicates low battery conditions for wireless sensors.
- **Leak sensor**: Detects water leaks when using compatible water leak detection sensors.
- **Rain state**: Indicates whether it is currently raining.

### Sensors

#### Air quality

- **CO2**: Carbon dioxide concentration. Native unit is parts per million (ppm). Can be displayed in ppb (parts per billion) or other concentration units based on your preferences.
- **PM1**: Ultra-fine particulate matter 1.0 concentration. Native unit is micrograms per cubic meter (µg/m³). Can be displayed in mg/m³, g/m³, or µg/ft³ based on your preferences.
- **PM2.5**: Fine particulate matter 2.5 concentration. Native unit is micrograms per cubic meter (µg/m³). Can be displayed in mg/m³, g/m³, or µg/ft³ based on your preferences.
- **PM4**: Particulate matter 4.0 concentration. Native unit is micrograms per cubic meter (µg/m³). Can be displayed in mg/m³, g/m³, or µg/ft³ based on your preferences.
- **PM10**: Coarse particulate matter 10 concentration. Native unit is micrograms per cubic meter (µg/m³). Can be displayed in mg/m³, g/m³, or µg/ft³ based on your preferences.

#### Lightning detection

- **Lightning count**: Total number of lightning strikes detected.
- **Lightning distance**: Distance to the last detected lightning strike. Native unit is kilometers (km) or miles (mi) depending on your Home Assistant unit system. Can be displayed in m, ft, cm, in, yd, or nmi (nautical miles) based on your preferences.

#### Power and diagnostics

- **Battery level**: Battery percentage for wireless sensors.
- **Battery voltage**: Battery voltage for connected sensors in volts (V).
- **Signal strength**: Signal quality indicator for wireless sensors in percentage.

#### Precipitation

- **Rain rate**: Current rainfall intensity. Native unit is millimeters per hour (mm/h) or inches per hour (in/h) depending on your Home Assistant unit system. Can be displayed in mm/d or in/d based on your preferences.
- **Rainfall**: Total rainfall accumulation. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in cm based on your preferences.
- **Daily rainfall**: Rainfall amount for the current day. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in cm based on your preferences.
- **Weekly rainfall**: Rainfall amount for the current week. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in cm based on your preferences.
- **Monthly rainfall**: Rainfall amount for the current month. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in cm based on your preferences.
- **Yearly rainfall**: Rainfall amount for the current year. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in cm based on your preferences.

#### Soil

- **Soil moisture**: Soil moisture percentage for connected soil moisture sensors.
- **Soil temperature**: Temperature readings from soil temperature sensors. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in K (Kelvin) based on your preferences.

#### Solar and UV

- **Light intensity**: Illuminance measurement in lux (lx).
- **Solar radiation**: Solar irradiance. Native unit is watts per square meter (W/m²). Can be displayed in BTU/(h⋅ft²) or W/m² based on your preferences.
- **UV index**: Current UV index value. The UV index is a standardized measurement of ultraviolet radiation strength from the sun. Values range from 0-2 (low risk), 3-5 (moderate), 6-7 (high), 8-10 (very high), to 11+ (extreme). Higher values indicate greater risk from unprotected sun exposure.

#### Weather

- **Barometric pressure**: Atmospheric pressure. Native unit is hectopascals (hPa) or inches of mercury (inHg) depending on your Home Assistant unit system. Can be displayed in Pa, kPa, bar, mbar, mmHg, psi, or other pressure units based on your preferences.
- **Dew point**: Calculated dew point temperature. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in K (Kelvin) based on your preferences.
- **Humidity**: Indoor and outdoor humidity percentage.
- **Temperature**: Indoor and outdoor temperature measurements. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in K (Kelvin) based on your preferences.

#### Wind

- **Wind direction**: Wind direction in degrees (°).
- **Wind gust**: Maximum wind gust speed. Native unit is kilometers per hour (km/h) or miles per hour (mph) depending on your Home Assistant unit system. Can be displayed in m/s, kn (knots), ft/s, Beaufort, or other speed units based on your preferences.
- **Wind speed**: Current wind speed. Native unit is kilometers per hour (km/h) or miles per hour (mph) depending on your Home Assistant unit system. Can be displayed in m/s, kn (knots), ft/s, Beaufort, or other speed units based on your preferences.

## TLS/SSL limitations

Ecowitt devices do not support TLS/SSL connections (HTTPS). If your Home Assistant instance is configured to use HTTPS only, the Ecowitt integration will not work properly. You must ensure your Home Assistant instance is accessible via HTTP (non-secure) for the Ecowitt devices to successfully send data.

If you're using SSL/TLS for your Home Assistant instance, you'll need to configure your setup to accept both secure (HTTPS) and non-secure (HTTP) connections. This can typically be done by adjusting your reverse proxy configuration or by using the NGINX Home Assistant add-on which can handle both HTTP and HTTPS traffic simultaneously.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
