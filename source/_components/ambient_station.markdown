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
ha_iot_class: "Cloud Push"
redirect_from:
 - /components/sensor.ambient_station/
---

The `Ambient Weather Station` component retrieves local weather information
via personal weather stations from
[Ambient Weather](https://ambientweather.net).

## {% linkable_title Generating API Keys and Application Keys %}

Using this component requires both an Application Key and an API Key. To
generate both, simply utilize the profile section of
[your Ambient Weather dashboard](https:/dashboard.ambientweather.net).

## {% linkable_title Configuration %}

To add your Ambient Weather PWS to your Home Assistant installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ambient_station:
  api_key: <YOUR API KEY>
  app_key: <YOUR APPLICATION KEY>
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
  required: optional
  type: list
  keys:
    24hourrainin:
      description: 24h rain accumulation
    baromabsin:
      description: Absolute atmospheric pressure
    baromrelin:
      description: Relative atmospheric pressure
    battout:
      description: Weather station battery health
    co2:
      description: CO2 level
    dailyrainin:
      description: Daily rain accumulation
    dewPoint:
      description: Dewpoint temperature
    eventrainin:
      description: Event Rain accumulation
    feelsLike:
      description: Feels Like temperature
    hourlyrainin:
      description: Hourly rain accumulation
    humidity:
      description: Outdoor humidity
    humidityin:
      description: Indoor humidity
    lastRain:
      description: Datetime of last rain event
    maxdailygust:
      description: Max daily wind gust
    monthlyrainin:
      description: Monthly rain accumulation
    solarradiation:
      description: Solar radiation
    tempf:
      description: Outdoor temperature
    tempinf:
      description: Indoor temperature
    totalrainin:
      description: Lifetime rain accumulation (since last reset)
    uv:
      description: UV index
    weeklyrainin:
      description: Weekly rain accumulation
    winddir:
      description: Wind direction
    winddir_avg10m:
      description: Wind direction, 10m moving average
    winddir_avg2m:
      description: Wind direction, 2m moving average
    windgustdir:
      description: Wind gust direction
    windgustmph:
      description: Wind gust
    windspdmph_avg10m:
      description: Wind speed, 10m moving average
    windspdmph_avg2m:
      description: Wind speed, 2m moving average
    windspeedmph:
      description: Windspeed
    yearlyrainin:
      description: Yearly rain accumulation
{% endconfiguration %}
