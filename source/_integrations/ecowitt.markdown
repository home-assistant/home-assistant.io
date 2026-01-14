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

- **CO2**: Carbon dioxide concentration.
  - Native unit is parts per million (ppm). Can be displayed in ppb, ppm, µg/m³, mg/m³, g/m³, µg/ft³, or p/m³.
  - Outdoor air is typically around 400 ppm.
  - Good air quality is below 1,000 ppm, acceptable is 1,000-1,500 ppm, and poor ventilation is above 2,000 ppm.
- **PM1**: Ultra-fine particulate matter 1.0 concentration.
  - Native unit is micrograms per cubic meter (µg/m³). Can be displayed in µg/m³, mg/m³, g/m³, µg/ft³, ppm, ppb, or p/m³.
  - Measures airborne particles with a diameter of 1 micrometer or smaller, such as combustion particles and ultrafine dust.
  - Good air quality is below 15 µg/m³, moderate is 15-35 µg/m³, and unhealthy is above 35 µg/m³.
- **PM2.5**: Fine particulate matter 2.5 concentration.
  - Native unit is micrograms per cubic meter (µg/m³). Can be displayed in µg/m³, mg/m³, g/m³, µg/ft³, ppm, ppb, or p/m³.
  - Measures particles with a diameter of 2.5 micrometers or smaller, such as smoke, haze, and fine dust.
  - Good air quality is below 12 µg/m³, moderate is 12-35 µg/m³, and unhealthy is above 55 µg/m³.
- **PM4**: Particulate matter 4.0 concentration.
  - Native unit is micrograms per cubic meter (µg/m³). Can be displayed in µg/m³, mg/m³, g/m³, µg/ft³, ppm, ppb, or p/m³.
  - Measures particles with a diameter of 4 micrometers or smaller.
- **PM10**: Coarse particulate matter 10 concentration.
  - Native unit is micrograms per cubic meter (µg/m³). Can be displayed in µg/m³, mg/m³, g/m³, µg/ft³, ppm, ppb, or p/m³.
  - Measures particles with a diameter of 10 micrometers or smaller, including dust, pollen, and mold spores.
  - Good air quality is below 54 µg/m³, moderate is 55-154 µg/m³, and unhealthy is above 255 µg/m³.

#### Lightning detection

- **Lightning count**: Total number of lightning strikes detected.
- **Lightning distance**: Distance to the last detected lightning strike. Native unit is kilometers (km) or miles (mi) depending on your Home Assistant unit system. Can be displayed in mm, cm, m, km, in, ft, yd, mi, or nmi.

#### Power and diagnostics

- **Battery level**: Battery percentage for wireless sensors.
- **Battery voltage**: Battery voltage for connected sensors in volts (V).
- **Signal strength**: Signal quality indicator for wireless sensors in percentage.

#### Precipitation

- **Rain rate**: Current rainfall intensity. Native unit is millimeters per hour (mm/h) or inches per hour (in/h) depending on your Home Assistant unit system. Can be displayed in mm/h, mm/d, in/h, or in/d.
- **Rainfall**: Total rainfall accumulation. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in mm, cm, or in.
- **Daily rainfall**: Rainfall amount for the current day. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in mm, cm, or in.
- **Weekly rainfall**: Rainfall amount for the current week. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in mm, cm, or in.
- **Monthly rainfall**: Rainfall amount for the current month. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in mm, cm, or in.
- **Yearly rainfall**: Rainfall amount for the current year. Native unit is millimeters (mm) or inches (in) depending on your Home Assistant unit system. Can be displayed in mm, cm, or in.

#### Soil

- **Soil moisture**: Soil moisture percentage for connected soil moisture sensors.
- **Soil temperature**: Temperature readings from soil temperature sensors. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in °C, °F, or K.

#### Solar and UV

- **Light intensity**: Illuminance measurement in lux (lx). Lux measures the amount of light falling on a surface.
  - Typical values include direct sunlight (32,000-100,000 lx), overcast day (1,000 lx), office lighting (320-500 lx), living room (50-150 lx), and full moon (1 lx).
- **Solar radiation**: Solar irradiance. Native unit is watts per square meter (W/m²). Can be displayed in W/m² or BTU/(h⋅ft²).
- **UV index**: Current UV index value. The UV index is a standardized measurement of ultraviolet radiation strength from the sun.
  - Values range from 0-2 (low risk), 3-5 (moderate), 6-7 (high), 8-10 (very high), to 11+ (extreme).
  - Higher values indicate greater risk from unprotected sun exposure.

#### Weather

- **Barometric pressure**: Atmospheric pressure. Native unit is hectopascals (hPa) or inches of mercury (inHg) depending on your Home Assistant unit system. Can be displayed in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, or psi.
  - Barometric pressure measures the weight of air pressing down on the Earth's surface.
  - Standard sea level pressure is around 1013 hPa (29.92 inHg).
  - High pressure typically indicates fair weather, while low pressure indicates clouds and precipitation.
  - Rapidly falling pressure often signals approaching storms.
- **Dew point**: Calculated dew point temperature. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in °C, °F, or K.
  - Dew point is the temperature at which air becomes saturated with moisture and condensation begins to form.
  - Higher dew points indicate more moisture in the air.
  - Comfortable levels are below 13°C (55°F), muggy is 16-18°C (60-65°F), oppressive is above 21°C (70°F).
  - Dew point is a better indicator of humidity comfort than relative humidity.
- **Humidity**: Indoor and outdoor humidity percentage.
- **Temperature**: Indoor and outdoor temperature measurements. Native unit is degrees Celsius (°C) or Fahrenheit (°F) depending on your Home Assistant unit system. Can be displayed in °C, °F, or K.

#### Wind

- **Wind direction**: Wind direction in degrees (°).
- **Wind gust**: Maximum wind gust speed. Native unit is kilometers per hour (km/h) or miles per hour (mph) depending on your Home Assistant unit system. Can be displayed in Beaufort, ft/s, in/s, m/min, m/s, km/h, kn, mph, or mm/s.
- **Wind speed**: Current wind speed. Native unit is kilometers per hour (km/h) or miles per hour (mph) depending on your Home Assistant unit system. Can be displayed in Beaufort, ft/s, in/s, m/min, m/s, km/h, kn, mph, or mm/s.

## TLS/SSL limitations

Ecowitt devices do not support TLS/SSL connections (HTTPS). If your Home Assistant instance is configured to use HTTPS only, the Ecowitt integration will not work properly. You must ensure your Home Assistant instance is accessible via HTTP (non-secure) for the Ecowitt devices to successfully send data.

If you're using SSL/TLS for your Home Assistant instance, you'll need to configure your setup to accept both secure (HTTPS) and non-secure (HTTP) connections. This can typically be done by adjusting your reverse proxy configuration or by using the NGINX Home Assistant add-on which can handle both HTTP and HTTPS traffic simultaneously.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
