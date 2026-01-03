---
title: Météo-France
description: Instructions on how to integrate Météo-France within Home Assistant.
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@hacf-fr'
  - '@oncleben31'
  - '@Quentame'
ha_config_flow: true
ha_domain: meteo_france
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
---

The `meteo_france` integration uses the meteorological data from [Météo-France](http://www.meteofrance.com/) to provide weather forecast for any location in the world with a focus on France. One or more locations can be set via the front end or via the configuration file.

The integration support the following platforms within Home Assistant:

- [Weather](#weather-platform)
- [Sensor](#sensor-platforms)

It displays the current weather along with a 5 days forecast and create sensors, including weather alerts and 1 hour rain forecast.

{% include integrations/config_flow.md %}


## Weather platform

To be used with the weather dashboard card to access current condition, today and next four days (default) or hours forecast.

## Sensor platforms

All the following sensors will be created :

|Entity|Description|Enabled by default|
|------|-----------|------------------|
|`cloud`|The current cloud cover in %|Yes|
|`daily_original_condition`|The daily original weather condition|No|
|`freeze_chance`|Probability of temperature below 0°C in the following hours|Yes|
|`next_rain`|Datetime of the next rain if expected within the next hour|Yes|
|`original_condition`|The current original weather condition|No|
|`precipitation`|Precipitation cumulation for next 24 hours in mm|Yes|
|`pressure`|The current pressure in hPa|No|
|`rain_chance`|Probability of rain in the following hours|Yes|
|`snow_chance`|Probability of snow for the following hours|Yes|
|`temperature`|The current temperature in °C|No|
|`uv`|The current UV index|Yes|
|`weather_alert`|Weather alert status ([see note below](#about-weather_alert-sensor))|Yes|
|`wind_gust`|The current wind gust speed in km/h|No|
|`wind_speed`|The current wind speed in km/h|No|

Warning: The probability entities data are not always provided by the API. They are added only if available.

To enable an entity disabled by default, go in **Settings** -> **Devices & services**, click on the city name in **Météo-France** and then the **X entities** link. You will have the list of the enabled entities. Here click the filter button and select **Show disable entities**. The disabled entities will be visible in the list, select the one you want to enable and click the **Enable Selected** button.

### About `next_rain` condition sensor

The attributes allow to have a forecast of the rain type by 5 to 10 minutes intervals:

- `forecast_time_ref` give a timestamp in ISO format UTC, corresponding to the start of the
  forecast.
- `1_hour_forecast` is a dictionary to access the type of rain for the next hour for each periods.
  
"Type of rain" values are given by Météo-France API. Values already noted are:
- `Temps sec`
- `Pluie faible`
- `Pluie modérée`
- `Pluie forte`

Example:

```yaml
forecast_time_ref: '2020-08-20T19:25:00+00:00'
1_hour_forecast:
  0 min: Temps sec
  5 min: Temps sec
  10 min: Temps sec
  15 min: Temps sec
  20 min: Temps sec
  25 min: Pluie faible
  35 min: Pluie faible
  45 min: Pluie modérée
  55 min: Pluie modérée
```

### About `weather_alert` sensor

{% note %}
The weather alert is available for the metropolitan France and Andorre.
{% endnote %}

The `weather_alert` sensor state give the current weather alert status for the department linked to the city. Only one entity by department is created.

The sensor attributes give access to each type of alerts raised by Météo-France.
