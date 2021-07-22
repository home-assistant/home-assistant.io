---
title: Trafikverket Weather Station
description: Instructions how to integrate Trafikverket WeatherStation within Home Assistant.
ha_category:
  - Weather
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_domain: trafikverket_weatherstation
ha_codeowners:
  - '@endor-force'
ha_platforms:
  - sensor
---

Showing weather information provided by [Trafikverket](https://www.trafikverket.se/) weather stations in Sweden.

Potential use cases:

- Get weather data in general.
- You live near a weather station and want to know the current weather conditions at home.
- Setup automations for your car heating system. If the road is frozen along the way to work, you might want the car heating system to start earlier.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: trafikverket_weatherstation
    name: Trafikverket Kungälv
    api_key: YOUR_API_KEY
    station: Kungälv
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
        - wind_direction
        - wind_direction_text
        - wind_speed
        - wind_speed_max
        - precipitation_amount
        - precipitation_amountname
```

{% configuration %}
name:
  description: Your unique name of the device in the frontend.
  required: true
  type: string
api_key:
  description: Your personal API key from Trafikverket.
  required: true
  type: string
station:
  description: Name of the weather station from Trafikverket.
  required: true
  type: string
monitored_conditions:
  description: Specify what measurement data to retrieve from the weather station.
  required: true
  type: list
  keys:
    air_temp:
      description: Air temperature.
    road_temp:
      description: The temperature in the road.
    humidity:
      description: Relative humidity.
    precipitation:
      description: Type of precipitation (Swedish text).
    wind_direction:
      description: Wind direction in degrees.
    wind_direction_text:
      description: Rough wind direction in twelve variants (Swedish text).
    wind_speed:
      description: Average wind speed during the last 10 minutes.
    wind_speed_max:
      description: Maximum wind speed measured during the last 30 minutes.
    precipitation_amount:
      description: Amount of precipitation.
    precipitation_amountname:
      description: Amount of precipitation in thirteen variants (Swedish text).
    
{% endconfiguration %}

## Obtaining API key

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

## Weather stations

Click [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/606442.17/6886316.22/&Layers=RoadWeather%2b) to get a map of valid weather stations. Once a station is found, copy the name according to the below picture and paste it in your `configuration.yaml` file as the `station` variable.

<p class='img'>
  <img src='/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>

## Examples

```yaml
sensor:
  - platform: trafikverket_weatherstation
    name: Trafikverket Kungälv
    api_key: YOUR_API_KEY
    station: Kungälv
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
        - wind_direction
        - wind_direction_text
        - wind_speed
        - wind_speed_max
  - platform: trafikverket_weatherstation
    name: Trafikverket Lanna
    api_key: YOUR_API_KEY
    station: Lanna
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
  - platform: trafikverket_weatherstation
    name: Trafikverket Nöbbele
    api_key: YOUR_API_KEY
    station: Nöbbele
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
        - precipitation_amount
        - precipitation_amountname
```
