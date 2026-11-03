---
title: AccuWeather
description: Instructions on how to integrate AccuWeather within Home Assistant.
ha_categories:
  - weather_alerts.forecasts
  - weather_alerts.air_quality_pollen
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: accuweather
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: service
---

The **AccuWeather** {% term integration %} uses the [AccuWeather](https://accuweather.com/) web service as a source for weather data for your location. A paid subscription is required to use this integration.

## Prerequisites

To use this integration, you need an AccuWeather API key.

1. Go to the [AccuWeather APIs](https://developer.accuweather.com/) page and register an account.
2. Subscribe to one of the available plans. If you want to configure the integration for more than two locations, you need a plan higher than **Starter**.
3. In the **Subscriptions & Keys** section, create an application to generate an API key.

You can test your newly created API key on the [AccuWeather location search](https://developer.accuweather.com/core-weather/location-key-locations#location-search-by-location-key) page.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key generated in the AccuWeather APIs portal. You can find it in the **Subscriptions & Keys** section after you create an application."
Location:
  description: "The location you want weather data for. Select it on the map. By default, the map shows your Home Assistant home location."
{% endconfiguration_basic %}

## Supported functionality

The **AccuWeather** integration provides the following entities for each configured location. Some sensors are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity). You can enable them after you set up the integration.

### Weather

- **Weather**
  - **Description**: The current weather and forecasts for the location. Use it with the weather forecast card on your dashboard, or with the [`weather.get_forecasts`](/actions/weather.get_forecasts/) action in automations and scripts.
  - **Current values**: Condition, temperature, apparent temperature, dew point, humidity, pressure, wind speed, wind gust speed, wind bearing, visibility, cloud coverage, and UV index.
  - **Forecasts**: Daily and hourly.
  - **Remarks**: The entity is named after the location.

### Current conditions sensors

- **Apparent temperature**
  - **Description**: The perceived outdoor temperature, taking wind and humidity into account.
  - **Remarks**: Disabled by default.
- **Cloud ceiling**
  - **Description**: The height of the cloud base.
  - **Unit**: m
- **Cloud cover**
  - **Description**: The percentage of the sky covered by clouds.
  - **Unit**: %
  - **Remarks**: Disabled by default.
- **Dew point**
  - **Description**: The temperature at which the air becomes saturated with water vapor.
  - **Remarks**: Disabled by default.
- **Humidity**
  - **Description**: The relative humidity.
  - **Unit**: %
  - **Remarks**: Disabled by default.
- **Precipitation**
  - **Description**: The amount of precipitation in the past hour.
  - **Unit**: mm/h
  - **Attributes**:
    - **Type**: The type of precipitation, such as rain or snow.
- **Pressure**
  - **Description**: The atmospheric pressure.
  - **Unit**: hPa
  - **Remarks**: Disabled by default.
- **Pressure tendency**
  - **Description**: The direction in which the atmospheric pressure is changing.
  - **Options**: Falling, Rising, Steady
- **RealFeel temperature**
  - **Description**: The AccuWeather RealFeel temperature, which describes how the weather feels.
- **RealFeel temperature shade**
  - **Description**: The AccuWeather RealFeel temperature in the shade.
  - **Remarks**: Disabled by default.
- **Temperature**
  - **Description**: The current outdoor temperature.
  - **Remarks**: Disabled by default.
- **UV index**
  - **Description**: The current ultraviolet index.
  - **Unit**: UV index
  - **Attributes**:
    - **Level**: The UV level description, such as Low or High.
  - **Remarks**: Disabled by default.
- **Wet bulb temperature**
  - **Description**: The lowest temperature that can be reached by evaporating water into the air.
  - **Remarks**: Disabled by default.
- **Wind chill temperature**
  - **Description**: The perceived temperature caused by the combination of air temperature and wind.
  - **Remarks**: Disabled by default.
- **Wind gust speed**
  - **Description**: The speed of wind gusts.
  - **Unit**: km/h
  - **Remarks**: Disabled by default.
- **Wind speed**
  - **Description**: The wind speed.
  - **Unit**: km/h
  - **Remarks**: Disabled by default.

### Daily forecast sensors

The integration creates a set of forecast sensors for today and for each of the next 4 days. The name of each sensor ends with the day number. Day 0 is today, day 1 is tomorrow, and so on. For example, **Hours of sun day 1**.

A forecast sensor is created for a given day only when AccuWeather provides that data for your location. Air quality and pollen data, in particular, is not available everywhere.

- **Air quality day N**
  - **Description**: The forecasted air quality category.
  - **Options**: Good, Moderate, Unhealthy, Very unhealthy, Hazardous
- **Cloud cover day N** and **Cloud cover night N**
  - **Description**: The forecasted cloud cover during the day and during the night.
  - **Unit**: %
  - **Remarks**: Disabled by default.
- **Condition day N** and **Condition night N**
  - **Description**: A text description of the forecasted weather conditions during the day and during the night.
- **Grass pollen day N**, **Mold pollen day N**, **Ragweed pollen day N**, and **Tree pollen day N**
  - **Description**: The forecasted pollen concentration for each pollen type.
  - **Unit**: p/m³
  - **Attributes**:
    - **Level**: The pollen level: Low, Moderate, High, Very high, or Extreme.
  - **Remarks**: Disabled by default.
- **Hours of sun day N**
  - **Description**: The forecasted number of hours of sunshine.
  - **Unit**: h
- **RealFeel temperature max day N** and **RealFeel temperature min day N**
  - **Description**: The forecasted highest and lowest RealFeel temperature.
- **RealFeel temperature shade max day N** and **RealFeel temperature shade min day N**
  - **Description**: The forecasted highest and lowest RealFeel temperature in the shade.
  - **Remarks**: Disabled by default.
- **Solar irradiance day N** and **Solar irradiance night N**
  - **Description**: The forecasted solar irradiance during the day and during the night.
  - **Unit**: W/m²
  - **Remarks**: Disabled by default.
- **Thunderstorm probability day N** and **Thunderstorm probability night N**
  - **Description**: The forecasted probability of a thunderstorm during the day and during the night.
  - **Unit**: %
- **UV index day N**
  - **Description**: The forecasted ultraviolet index.
  - **Unit**: UV index
  - **Attributes**:
    - **Level**: The UV level: Low, Moderate, High, Very high, or Extreme.
- **Wind gust speed day N** and **Wind gust speed night N**
  - **Description**: The forecasted speed of wind gusts during the day and during the night.
  - **Unit**: km/h
  - **Attributes**:
    - **Direction**: The wind direction, such as NW.
  - **Remarks**: Disabled by default.
- **Wind speed day N** and **Wind speed night N**
  - **Description**: The forecasted wind speed during the day and during the night.
  - **Unit**: km/h
  - **Attributes**:
    - **Direction**: The wind direction, such as NW.

## Data updates

By default, the integration {% term polling polls %} the current weather condition data from the AccuWeather API every 10 minutes, daily forecast data every 6 hours, and hourly forecast data every 30 minutes.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
