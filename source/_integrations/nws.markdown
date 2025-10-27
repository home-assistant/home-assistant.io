---
title: National Weather Service (NWS)
description: Instructions on how to integrate National Weather Service data within Home Assistant.
ha_category:
  - Weather
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MatthewFlamm'
  - '@kamiyo'
ha_domain: nws
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: integration
---

The `nws` platform uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

{% include integrations/config_flow.md %}

According to the [API documentation](https://www.weather.gov/documentation/services-web-api/), a string is required for the API key, and an email address is suggested to be included within the string.

Providing a METAR station code is optional, and if not supplied, the closest station to the latitude and longitude will be chosen. A list of nearby stations is printed to the log with level `DEBUG` if no station is supplied. Stations can also be found on the [NOAA website](https://www.cnrfc.noaa.gov/metar.php). Codes with only three characters, for example, `ADW` should be prefixed with the letter K, `KADW`.

One weather entity is created for each entry in the configuration. Hourly and day/night forecasts are provided through the [`weather.get_forecasts` action](/integrations/weather#action-weatherget_forecasts). The time supplied for each forecast is the start time for the forecast. Sensors are also created as disabled entities after configuration and can be enabled by the user.

## Action `nws.get_forecasts_extra` 

`nws.get_forecasts_extra` provides extra data in a form similar to `weather.get_forecasts`. See [`weather.get_forecasts` documentation](/integrations/weather#action-weatherget_forecasts).

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `type` | no | The type of forecast, must be either `twice_daily` or `hourly`. | `twice_daily` |

```yaml
action: nws.get_forecasts_extra
target:
  entity_id:
    - weather.khou
data:
  type: twice_daily
response_variable: weather_forecast
```

The response data field is a mapping of called target entities, each containing the `forecast` field.
`forecast` is a list of forecasted conditions at a given point in time that are not returned from `weather.get_forecasts`.  The `datetime` and `is_daytime` attributes are still provided for context.

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `datetime` | The time of the forecasted conditions. | 2023-02-17T14:00:00+00:00 |
| `is_daytime` | Only set for `twice_daily` forecasts. | True |
| `detailed_description` | Only set for `twice_daily` forecasts. | 50% Chance of rain, otherwise partly cloudy with a high of 75F. |
| `short_description` | Short weather condition | Partly Sunny then Slight Chance Showers And Thunderstorms |

## Details

Details about the API are available in the [NWS API documentation](https://www.weather.gov/documentation/services-web-api). The [pynws](https://github.com/MatthewFlamm/pynws) library is used to retrieve data.
