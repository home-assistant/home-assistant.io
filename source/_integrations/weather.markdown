---
title: Weather
description: Instructions on how to setup your Weather platforms with Home Assistant.
ha_category:
  - Weather
ha_release: 0.32
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: weather
ha_integration_type: entity
---

The `weather` platforms gather meteorological information from web services and display the conditions and other details about the weather at the given location.

{% include integrations/building_block_integration.md %}

For a list of weather integrations, on the integrations page, select the [weather category](/integrations/#weather).

Read the {% term integration %} documentation for your particular weather provider to learn how to set it up.

Home Assistant currently supports free web services some of which require registration.

## State and state attributes

A weather {% term entity %}'s state is used to indicate the current overall conditions, e.g. 'cloudy' or 'sunny'.

### Condition mapping

The `weather` {% term entity %} can provide the conditions listed below as its state:

- 'clear-night'
- 'cloudy'
- 'fog'
- 'hail'
- 'lightning'
- 'lightning-rainy'
- 'partlycloudy'
- 'pouring'
- 'rainy'
- 'snowy'
- 'snowy-rainy'
- 'sunny'
- 'windy'
- 'windy-variant'
- 'exceptional'

### State attributes

Detailed weather conditions as well as the unit of measurements used for the conditions are indicated by state attributes. A weather {% term entity %} may not support all the state attributes.

{% raw %}
```yaml
apparent_temperature: 12.0
cloud_coverage: 0
dew_point: 5.0
humidity: 76
precipitation_unit: mm
pressure: 1019
pressure_unit: hPa
temperature: 14.2
temperature_unit: °C
uv_index: 2
visibility: 10
visibility_unit: km
wind_bearing: 260
wind_gust_speed: 51.56
wind_speed: 35.17
wind_speed_unit: km/h
```
{% endraw %}

## Service `weather.get_forecast`

Weather integrations which support weather forecasts expose the forecast using services. The services provided by weather entities are described below, and you can also read more about [Service Calls](/docs/scripts/service-calls/).

<div class='note'>

Some integrations may not support the `weather.get_forecast` service, but instead expose weather forecasts as a state attribute named `forecast`. This behavior is deprecated and will be removed in a future release of Home Assistant Core.

</div>

This service populates [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data)
with a weather forecast.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `type` | no | The type of forecast, must be one of `daily`, `twice_daily` or `hourly`. | daily

{% raw %}
```yaml
service: weather.get_forecast
target:
  entity_id: weather.home
data:
  type: daily
response_variable: weather_forecast
```
{% endraw %}

The response data field `forecast` is a list of forecasted conditions at a given point in time:

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `datetime` | The time of the forecasted conditions. | 2023-02-17T14:00:00+00:00
| `is_daytime` | Only set for `twice_daily` forecasts. | False
| `apparent_temperature` | The apparent (feels-like) temperature in the unit indicated by the `temperature_unit` state attribute. | 10.2
| `cloud_coverage` | The cloud coverage in %. | 15
| `condition` | The weather condition. | Sunny
| `dew_point` | The dew point temperature in the unit indicated by the `temperature_unit` state attribute. | 6.0
| `humidity` | The relative humidity in %. | 82
| `precipitation_probability` | The probability of precipitation in %. | 0
| `precipitation` | The precipitation amount in the unit indicated by the `precipitation_unit` state attribute. | 0
| `pressure` | The air pressure in the unit indicated by the `pressure_unit` state attribute. | 1019
| `temperature` | The temperature in the unit indicated by the `temperature_unit` state attribute. If templow is also provided, this is the higher temperature. | 14.2
| `templow` | The lower temperature in the unit indicated by the `temperature_unit` state attribute. | 5.0
| `uv_index` | The UV index. | 3
| `wind_bearing` | The wind bearing in azimuth angle (degrees) or 1-3 letter cardinal direction. | 268
| `wind_gust_speed` | The wind gust speed in the unit indicated by the `wind_speed_unit` state attribute. | 34.41
| `wind_speed` | The wind speed in the unit indicated by the `wind_speed_unit` state attribute. | 24.41


Example forecast:

{% raw %}
```yaml
forecast:
  - condition: cloudy
    precipitation_probability: 0
    datetime: '2023-02-17T14:00:00+00:00'
    wind_bearing: 268
    temperature: 14.2
    pressure: 1019
    wind_speed: 24.41
    precipitation: 0
  - condition: cloudy
    precipitation_probability: 0
    datetime: '2023-02-17T15:00:00+00:00'
    wind_bearing: 268
    temperature: 13.8
    pressure: 1019
    wind_speed: 22.61
    precipitation: 0
  - condition: cloudy
    precipitation_probability: 0
    datetime: '2023-02-17T16:00:00+00:00'
    wind_bearing: 265
    temperature: 13.2
    pressure: 1020
    wind_speed: 20.27
    precipitation: 0
```
{% endraw %}
