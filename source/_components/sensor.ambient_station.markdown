---
layout: page
title: "Ambient Weather Station Sensor"
description: "How to integrate Ambient Weather station within Home Assistant."
date: 2018-11-15 08:00
sidebar: true
comments: false
logo: ambient_weather.png
ha_category: Weather
ha_release: "0.85"
ha_iot_class: "Cloud Polling"
---

The `Ambient Weather Station` platform uses the [Ambient Weather](https://ambientweather.net)  
web API to retrieve weather data from your personal weather station (PWS).

You need to register your compatible PWS using its MAC address and then request both an API key and an Application key. The key requests can be found
under `My Account`.  Requesting an application key requires emailing the ambient weather support team.

To add your Ambient Weather PWS to your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ambient_station
    api_key: YOUR_API_KEY
    app_key: YOUR_APP_KEY
    monitored_conditions:
      - tempf
      - humidity
      - windspeedmph
```

{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
app_key:
  description: The Application key to access the service.
  required: true
  type: string
monitored_conditions:
  description: Weather conditions to track.
  required: true
  type: list
  keys:
    winddir:
      description: Wind direction
    windspeedmph:
      description: Windspeed
    windgustmph:
      description: Wind gust
    maxdailygust:
      description: Max daily wind gust
    windgustdir:
      description: Wind gust direction
    windspdmph_avg2m:
      description: Wind speed, 2m moving average
    winddir_avg2m:
      description: Wind direction, 2m moving average
    windspdmph_avg10m:
      description: Wind speed, 10m moving average
    winddir_avg10m:
      description: Wind direction, 10m moving average 
    humidity:
      description:  Outdoor humidity
    humidityin:
      description: Indoor humidity
    tempf:
      description: Outdoor temperature 
    tempinf:
      description: Indoor temperature
    battout:
      description: Weather station battery health
    hourlyrainin:
      description: Hourly rain accumulation
    dailyrainin:
      description: Daily rain accumulation
    24hourrainin:
      description: 24h rain accumulation
    weeklyrainin:
      description: Weekly rain accumulation
    monthlyrainin:
      description: Monthly rain accumulation
    yearlyrainin:
      description: Yearly rain accumulation
    eventrainin:
      description: Event Rain accumulation
    totalrainin:
      description: Lifetime rain accumulation (since last reset)
    baromrelin:
      description: Relative atmospheric pressure
    baromabsin:
      description: Absolute atmospheric pressure
    uv:
      description: UV index
    solarradiation:
      description: Solar radiation 
    co2:
      description: CO2 level
    lastRain:
      description: Datetime of last rain event
    dewPoint:
      description: Dewpoint temperature 
    feelsLike:
      description: Feels Like temperature
{% endconfiguration %}
