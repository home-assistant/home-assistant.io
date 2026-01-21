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

## Supported devices

The following devices have been reported to work with the **Ecowitt** {% term integration %}:

### Gateway/Hub

- GW1200 Wi-Fi Gateway
- GW2000 Ethernet and Wi-Fi Gateway
- GW3000 Ethernet and Wi-Fi Gateway with Data Storage

### Sensors

- WH51 Wireless Soil Moisture Sensor
- WH40 Wireless Self-emptying Rain Gauge Sensor
- WH57 Outdoor Wireless Lightning Detection Sensor
- WS90 Wireless 7-in-1 Weather Sensor

## Prerequisites

- Your weather station is set up with sensors connected and functioning.

- Your gateway is connected to your local network via Wi-Fi or Ethernet. You can configure the network connection using one of the following methods:

  - **Ecowitt mobile app** (requires creating an Ecowitt account)

  - **Embedded web interface** by connecting to the device's Wi-Fi hotspot and opening `192.168.4.1` in a browser (no account required)
- Your Home Assistant instance is accessible via HTTP. Ecowitt devices do not support HTTPS connections. If your instance only accepts HTTPS, refer to [TLS/SSL limitations](#tlsssl-limitations).

{% include integrations/config_flow.md %}

## Ecowitt Weather Station configuration

The **Ecowitt** {% term integration %} works by first creating a callback endpoint on your Home Assistant instance and then adding this configuration to the Ecowitt console so that it starts sending data.

The integration will display a Server IP / Host Name, Path, and Port. You can input it into the Ecowitt configuration in one of two ways:

**Option 1**: Use the Ecowitt app (on your phone):

1. In the top-left corner, select the menu icon ({% icon "mdi:menu" %}) and select **Devices**.
   - Under **My Devices**, select your Ecowitt station.
2. In the top-right corner, select the ellipsis icon ({% icon "mdi:dots-horizontal" %}).
   - From the list, select **Others**.
   - Select the **DIY Upload Servers** button, and from the **Supported Servers List**, select **Customized**.
   - From the **Protocol Type Same As** list, select **Ecowitt**.
   - Enter the Server IP / Host Name, Path, and Port from the integration.
     - The path has to match! Remove the first forward slash from the path, as the app will prepend one.
3. Save your settings.

**Option 2**: Navigate to the Ecowitt web UI in a browser at the station IP address:

1. Select **Weather Services** then scroll down to the **Customized** section.
2. Under **Customized**, select 🔘 Enable and **Protocol Type Same As** 🔘 Ecowitt.
3. Enter the Server IP / Host Name, Path, and Port from the integration.
4. Save your settings.

## Supported functionality

The **Ecowitt** {% term integration %} provides the following {% term entities %}. Available entities depend on which sensors are connected to your weather station.

### Binary sensors

- **Battery status**: Indicates low battery conditions for wireless sensors.
- **Leak sensor**: Detects water leaks when using compatible water leak detection sensors.
- **Rain state**: Indicates whether it is currently raining.

### Sensors

#### Air quality

- **CO2**: Carbon dioxide concentration (ppm).
- **PM1**: Ultra-fine particulate matter 1.0 concentration (µg/m³).
- **PM2.5**: Fine particulate matter 2.5 concentration (µg/m³).
- **PM4**: Particulate matter 4.0 concentration (µg/m³).
- **PM10**: Coarse particulate matter 10 concentration (µg/m³).

#### Lightning detection

- **Lightning count**: Total number of lightning strikes detected.
- **Lightning distance**: Distance to the last detected lightning strike (km or mi).

#### Power and diagnostics

- **Battery level**: Battery percentage for wireless sensors.
- **Battery voltage**: Battery voltage for connected sensors in volts (V).
- **Signal strength**: Signal quality indicator for wireless sensors in percentage.

#### Precipitation

- **Rain rate**: Current rainfall intensity (mm/h or in/h).
- **Rainfall**: Total rainfall accumulation (mm or in).
- **Daily rainfall**: Rainfall amount for the current day (mm or in).
- **Weekly rainfall**: Rainfall amount for the current week (mm or in).
- **Monthly rainfall**: Rainfall amount for the current month (mm or in).
- **Yearly rainfall**: Rainfall amount for the current year (mm or in).

#### Soil

- **Soil moisture**: Soil moisture percentage for connected soil moisture sensors.
- **Soil temperature**: Temperature readings from soil temperature sensors (°C or °F).

#### Solar and UV

- **Light intensity**: Illuminance measurement (lx). Lux measures the amount of light falling on a surface.
- **Solar radiation**: Solar irradiance (W/m²).
- **UV index**: Current UV index value. The UV index is a standardized measurement of ultraviolet radiation strength from the sun.
  - Values range from 0-2 (low risk), 3-5 (moderate), 6-7 (high), 8-10 (very high), to 11+ (extreme).

#### Weather

- **Barometric pressure**: Atmospheric pressure (hPa or inHg).
- **Dew point**: Calculated dew point temperature (°C or °F).
- **Humidity**: Indoor and outdoor humidity percentage.
- **Temperature**: Indoor and outdoor temperature measurements (°C or °F).

#### Wind

- **Wind direction**: Wind direction (degrees).
- **Wind gust**: Maximum wind gust speed (km/h or mph).
- **Wind speed**: Current wind speed (km/h or mph).

## TLS/SSL limitations

Ecowitt devices do not support TLS/SSL connections (HTTPS). If your Home Assistant instance is configured to use HTTPS only, the Ecowitt integration will not work properly. You must ensure your Home Assistant instance is accessible via HTTP (non-secure) for the Ecowitt devices to successfully send data.

If you're using SSL/TLS for your Home Assistant instance, you'll need to configure your setup to accept both secure (HTTPS) and non-secure (HTTP) connections. This can typically be done by adjusting your reverse proxy configuration or by using the NGINX Home Assistant add-on which can handle both HTTP and HTTPS traffic simultaneously.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
