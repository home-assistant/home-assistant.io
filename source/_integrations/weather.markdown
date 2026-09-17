---
title: Weather
description: Instructions on how to set up your Weather platforms with Home Assistant.
ha_category:
  - Weather
ha_release: 0.32
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: weather
ha_integration_type: entity
---

The **Weather** {% term integration %} gather meteorological information from web services and display the conditions and other details about the weather at the given location.

{% include integrations/building_block_integration.md %}

For a list of weather integrations, on the integrations page, select the [weather category](/integrations/#weather).

Read the {% term integration %} documentation for your particular weather provider to learn how to set it up.

Home Assistant currently supports free web services some of which require registration.

## State and state attributes

A weather {% term entity %}'s state is used to indicate the current overall conditions, such as 'cloudy' or 'sunny'.

### Condition mapping

The `weather` {% term entity %} can provide the conditions listed below as its state:

- **Clear, night**: The sky is clear during the night. `clear-night`.
- **Cloudy**: There are many clouds in the sky. `cloudy`.
- **Fog**: There is a thick mist or fog reducing visibility. `fog`.
- **Hail**: Hailstones are falling. `hail`.
- **Lightning**: Lightning/thunderstorms are occurring. `lightning`.
- **Lightning, rainy**: Lightning/thunderstorm is occurring along with rain. `lightning-rainy`.
- **Partly cloudy**: The sky is partially covered with clouds. `partlycloudy`.
- **Pouring**: It is raining heavily. `pouring`.
- **Rainy**: It is raining. `rainy`.
- **Snowy**: It is snowing. `snowy`.
- **Snowy, rainy**: It is snowing and raining at the same time. `snowy-rainy`.
- **Sunny**: The sky is clear and the sun is shining. `sunny`.
- **Windy**: It is windy. `windy`.
- **Windy, cloudy**: It is windy and cloudy. `windy-variant`.
- **Exceptional**: Exceptional weather conditions are occurring. `exceptional`.

### State attributes

Detailed weather conditions as well as the unit of measurements used for the conditions are indicated by state attributes. A weather {% term entity %} may not support all the state attributes.

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

{% include integrations/actions.md %}

## Examples

{% details "Example template sensor using get_forecasts" %}

Example [template sensor](/integrations/template#yaml-configuration) that contains the hourly forecast

```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: weather.get_forecasts
        data:
          type: hourly
        target:
          entity_id: weather.home
        response_variable: hourly
    sensor:
      - name: Temperature forecast next hour
        unique_id: temperature_forecast_next_hour
        state: >
          {{
            hourly['weather.home'].forecast[0].temperature
          }}
        unit_of_measurement: "°C"
```

{% enddetails %}

{% details "Example action response" %}

```yaml
weather.tomorrow_io_home_nowcast:
  forecast:
    - datetime: "2023-12-07T13:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 241.19
      temperature: 0.1
      dew_point: -1.9
      wind_speed: 16.88
      precipitation: 0
      humidity: 86
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 232.41
      temperature: 0.8
      dew_point: -2.8
      wind_speed: 17.82
      precipitation: 0
      humidity: 77
    - datetime: "2023-12-07T15:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 236.09
      temperature: 1.1
      dew_point: -2.6
      wind_speed: 17.89
      precipitation: 0
      humidity: 77
weather.toronto_forecast:
  forecast:
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
    - datetime: "2023-12-07T15:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
    - datetime: "2023-12-07T16:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
```

{% enddetails %}
