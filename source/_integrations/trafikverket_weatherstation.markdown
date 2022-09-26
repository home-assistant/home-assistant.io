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
  - '@endor-force'
  - '@gjohansson-ST'
ha_platforms:
  - sensor
ha_integration_type: integration
---

Showing weather information provided by [Trafikverket](https://www.trafikverket.se/) weather stations in Sweden.

## Potential use cases

- Get weather data in general.
- You live near a weather station and want to know the current weather conditions at home.
- Setup automations for your car heating system. If the road is frozen along the way to work, you might want the car heating system to start earlier.

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Entities provided by the integration is
- Air temperature.
- Road temperature.
- Relative humidity.
- Type of precipitation (Swedish text).
- Wind direction in degrees.
- Rough wind direction in twelve variants (Swedish text).
- Average wind speed during the last 10 minutes.
- Maximum wind speed measured during the last 30 minutes.
- Amount of precipitation.
- Amount of precipitation in thirteen variants (Swedish text).

## Weather stations

Click [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/606442.17/6886316.22/&Layers=RoadWeather%2b) to get a map of valid weather stations. Once a station is found, copy the name according to the below picture and paste it in your `configuration.yaml` file as the `station` variable.

<p class='img'>
  <img src='/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>
