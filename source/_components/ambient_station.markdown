---
title: "Ambient Weather Station Sensor"
description: "How to integrate Ambient Weather station within Home Assistant."
logo: ambient_weather.png
ha_category:
  - Weather
ha_release: 0.85
ha_iot_class: Cloud Push
redirect_from:
 - /components/sensor.ambient_station/
---

The `Ambient Weather Station` integration retrieves local weather information
via personal weather stations from [Ambient Weather](https://ambientweather.net).

## Setup

Using this integration requires both an Application Key and an API Key. To
generate both, simply utilize the profile section of
[your Ambient Weather dashboard](https://dashboard.ambientweather.net).

## Configuration

To add your Ambient Weather PWS to your Home Assistant installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ambient_station:
  api_key: YOUR_API_KEY
  app_key: YOUR_APPLICATION_KEY
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
    batt1:
      description: Sensor 1 battery health
    batt2:
      description: Sensor 2 battery health
    batt3:
      description: Sensor 3 battery health
    batt4:
      description: Sensor 4 battery health
    batt5:
      description: Sensor 5 battery health
    batt6:
      description: Sensor 6 battery health
    batt7:
      description: Sensor 7 battery health
    batt8:
      description: Sensor 8 battery health
    batt9:
      description: Sensor 9 battery health
    batt10:
      description: Sensor 10 battery health
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
    humidity1:
      description: Sensor 1 humidity
    humidity2:
      description: Sensor 2 humidity
    humidity3:
      description: Sensor 3 humidity
    humidity4:
      description: Sensor 4 humidity
    humidity5:
      description: Sensor 5 humidity
    humidity6:
      description: Sensor 6 humidity
    humidity7:
      description: Sensor 7 humidity
    humidity8:
      description: Sensor 8 humidity
    humidity9:
      description: Sensor 9 humidity
    humidity10:
      description: Sensor 10 humidity
    humidityin:
      description: Indoor humidity
    lastRain:
      description: Datetime of last rain event
    maxdailygust:
      description: Max daily wind gust
    monthlyrainin:
      description: Monthly rain accumulation
    relay1:
      description: Sensor 1 relay status
    relay2:
      description: Sensor 2 relay status
    relay3:
      description: Sensor 3 relay status
    relay4:
      description: Sensor 4 relay status
    relay5:
      description: Sensor 5 relay status
    relay6:
      description: Sensor 6 relay status
    relay7:
      description: Sensor 7 relay status
    relay8:
      description: Sensor 8 relay status
    relay9:
      description: Sensor 9 relay status
    relay10:
      description: Sensor 10 relay status
    soilhum1:
      description: Sensor 1 soil humidity
    soilhum2:
      description: Sensor 2 soil humidity
    soilhum3:
      description: Sensor 3 soil humidity
    soilhum4:
      description: Sensor 4 soil humidity
    soilhum5:
      description: Sensor 5 soil humidity
    soilhum6:
      description: Sensor 6 soil humidity
    soilhum7:
      description: Sensor 7 soil humidity
    soilhum8:
      description: Sensor 8 soil humidity
    soilhum9:
      description: Sensor 9 soil humidity
    soilhum10:
      description: Sensor 10 soil humidity
    soiltemp1f:
      description: Sensor 1 soil temperature
    soiltemp2f:
      description: Sensor 2 soil temperature
    soiltemp3f:
      description: Sensor 3 soil temperature
    soiltemp4f:
      description: Sensor 4 soil temperature
    soiltemp5f:
      description: Sensor 5 soil temperature
    soiltemp6f:
      description: Sensor 6 soil temperature
    soiltemp7f:
      description: Sensor 7 soil temperature
    soiltemp8f:
      description: Sensor 8 soil temperature
    soiltemp9f:
      description: Sensor 9 soil temperature
    soiltemp10f:
      description: Sensor 10 soil temperature
    solarradiation:
      description: Solar radiation
    temp1f:
      description: Sensor 1 temperature
    temp2f:
      description: Sensor 2 temperature
    temp3f:
      description: Sensor 3 temperature
    temp4f:
      description: Sensor 4 temperature
    temp5f:
      description: Sensor 5 temperature
    temp6f:
      description: Sensor 6 temperature
    temp7f:
      description: Sensor 7 temperature
    temp8f:
      description: Sensor 8 temperature
    temp9f:
      description: Sensor 9 temperature
    temp10f:
      description: Sensor 10 temperature
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
