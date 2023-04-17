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

The `weather` platforms gather meteorological information from web services and display the conditions and other details about the weather at the given location. Read the integration documentation for your particular weather provider to learn how to set it up.

Home Assistant currently supports free web services some of which require registration.

## Condition mapping

The `weather` platform only knows the below listed conditions. The reason for this is that for these conditions is an icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) available and mapped in the frontend.

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

### Forecast Information

Periodic forecast information is stored in the `forecast` attribute on the entity. To access and use the information should be reserved for advanced users using [Templates](/docs/configuration/templating/).

```yaml
temperature: 14.2
temperature_unit: °C
humidity: 76
pressure: 1019
pressure_unit: hPa
wind_bearing: 260
wind_speed: 35.17
wind_speed_unit: km/h
visibility_unit: km
precipitation_unit: mm
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
