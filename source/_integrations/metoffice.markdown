---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MrHarcombe'
ha_domain: metoffice
ha_config_flow: true
ha_platforms:
  - sensor
  - weather
---

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data.

{% include integrations/config_flow.md %}


## Entities

A number of weather entities are created for each entry created in the configuration by location: one weather entity with a summary of the 3-hourly forecasts and twelve sensor entities for individual reporting on each of the individual measurements. The time supplied for each forecast is the start time for the forecast.

|Entity|Description|Enabled by default|
|------|-----------|------------------|
|weather.met_office_**site name**|Weather entity with state of the current weather condition and attributes of temperature, humidity, wind speed and visibility.|Yes.|
|sensor.**site name**_feels_like_temperature|Sensor entity giving the current forecast 'feels like' temperature.|No.|
|sensor.**site name**_humidity|Sensor entity giving the current forecast humidity.|No.|
|sensor.**site name**_probability_of_precipitation|Sensor entity giving the current forecast chance of rain.|Yes.|
|sensor.**site name**_station_name|Sensor entity giving the current forecast time interval since midnight UTC.|No.|
|sensor.**site name**_temperature|Sensor entity giving the current forecast temperature.|Yes.|
|sensor.**site name**_uv_index|Sensor entity giving the current forecast UV index.|No.|
|sensor.**site name**_visibility|Sensor entity giving the current forecast visibility classification.|No.|
|sensor.**site name**_visibility_distance|Sensor entity giving the current forecast visibility distance (as a range).|No.|
|sensor.**site name**_weather|Sensor entity giving the current forecast weather conditions.|Yes.|
|sensor.**site name**_wind_direction|Sensor entity giving the current forecast wind direction.|No.|
|sensor.**site name**_wind_gust|Sensor entity giving the current forecast maximum wind gust.|No.|
|sensor.**site name**_speed|Sensor entity giving the current forecast wind speed.|Yes.|

Details about the API are available in the [DataPoint API documentation](https://www.metoffice.gov.uk/services/data/datapoint/api-reference). The [DataPoint](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
