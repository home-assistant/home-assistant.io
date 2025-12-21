---
title: Trafikverket Weather Station
description: Instructions how to integrate Trafikverket WeatherStation within Home Assistant.
ha_category:
  - Weather
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: trafikverket_weatherstation
ha_codeowners:
  - '@gjohansson-ST'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

Showing weather information provided by [Trafikverket](https://www.trafikverket.se/) weather stations in Sweden.

## Potential use cases

- Get weather data in general.
- You live near a weather station and want to know the current weather conditions at home.
- Setup automations for your car heating system. If the road is frozen along the way to work, you might want the car heating system to start earlier.

## Prerequisites

Please click [here](https://data.trafikverket.se/home) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Entities provided by the integration
- Air temperature.
- Road temperature.
- Dew point
- Relative humidity.
- Precipitation type.
- Precipitation amount
- Wind direction in degrees.
- Wind speed

### Entities provided but not enabled by default
- Maximum wind speed measured during the last 30 minutes
- Measurement time
- Visible distance
- Road ice depth
- Road snow depth
- Road water depth
- Road water equivalent depth
- Wind measurement height
- Data modified time 

## Weather stations

To get a map of valid weather stations, open the [trafikverket website](https://www.trafikverket.se/trafikinformation/vag/?map_x=473143.67679&map_y=6622458.53332&map_z=2&map_l=100000001000000). Once a station is found, copy the name according to the below picture and paste it as the `station` variable.

<p class='img'>
  <img src='/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>
