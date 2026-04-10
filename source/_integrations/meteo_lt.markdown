---
title: Meteo.lt
description: Instructions on how to integrate Lithuanian Hydrometeorological Service (Meteo.lt) within Home Assistant.
ha_release: 2025.11
ha_iot_class: Cloud Polling
ha_category:
  - Weather
ha_codeowners:
  - '@xE1H'
ha_config_flow: true
ha_domain: meteo_lt
ha_platforms:
  - weather
ha_integration_type: service
ha_quality_scale: bronze
---

The **Meteo.lt** {% term integration %} uses meteorological data from the [Lithuanian Hydrometeorological Service](https://www.meteo.lt) (<abbr title="Lietuvos hidrometeorologijos tarnyba">LHMT</abbr>) to provide weather forecasts for locations in Lithuania. You can set up one or more locations via the user interface.

The integration provides current weather conditions along with hourly and daily forecasts from official weather stations across Lithuania.

## Supported functionality

- Current weather conditions including temperature, humidity, pressure, and wind data
- Hourly weather forecast for the next 24 hours
- Daily weather forecast for the next 5 days
- Weather station selection by coordinates or manual selection
- Multiple location support

## Prerequisites

This integration requires an active internet connection to retrieve weather data from the Meteo.lt <abbr title="Application Programming Interface">API</abbr>.

{% include integrations/config_flow.md %}

## Weather platform

The weather platform provides current conditions and forecasts that can be used with the weather dashboard card.

### Current conditions

The following current weather data is provided:

- **Temperature** (°C): Current air temperature
- **Apparent temperature** (°C): "Feels like" temperature
- **Humidity** (%): Relative humidity
- **Pressure** (hPa): Atmospheric pressure
- **Wind speed** (m/s): Current wind speed
- **Wind direction** (degrees): Wind direction in degrees
- **Wind gust speed** (m/s): Maximum wind gust speed
- **Cloud coverage** (%): Percentage of cloud cover
- **Condition**: Weather condition (clear, cloudy, rainy, etc.)

### Forecasts

The integration supports two types of forecasts:

- **Hourly forecast**: Available for the next 24 hours with detailed conditions including temperature, precipitation, wind, and cloud coverage.
- **Daily forecast**: Available for the next 5 days, aggregated from hourly data showing daily high/low temperatures and midday conditions.

## Data updates

Weather data is automatically updated every 30 minutes from the Meteo.lt <abbr title="Application Programming Interface">API</abbr>.

## Known limitations

- Weather data is only available for locations within Lithuania
- Historical weather data is not provided
- Weather warnings and alerts are not currently supported

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
