---
layout: page
title: "Trafikverket WeatherStation"
description: "Instructions how to integrate Trafikverket WeatherStation within Home Assistant."
date: 2018-02-01 12:06
sidebar: true
comments: false
sharing: true
footer: true
logo: trafikverket.png
ha_category: Sensor
ha_release: 0.64.0
---

Showing weather information for air and road temperature provided by [Trafikverket](https://www.trafikverket.se/) in Sweden. 

Potential use cases:
-	Get weather data in general
-	You live near a weather station and want to know the current temperature at home
-	Setup automations for your car heating system. If the road is frozen along the way to work you might want the car heating system to start earlier.

##### {% linkable_title Configuration %}
To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: trafikverket_weatherstations
    name: Trafikverket Road WeatherStation Kungälv
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Kungälv
    type: road
```

{% configuration %}
name:
  description: Unique name of the device in the frontend.
  required: true
  type: string
api_key:
  description: API key from Trafikverket.
  required: true
  type: string
station:
  description: Name of the weather station.
  required: true
  type: string
type:
  description: Defines which temperature you want (`air` or `road`).
  required: true
  type: string
scan_interval:
  description: How frequently to query for new data (in seconds).
  required: false
  type: int
  default: 300
{% endconfiguration %}

##### {% linkable_title Obtaining API key %}
Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

##### {% linkable_title Weather stations %}
Click [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/606442.17/6886316.22/&Layers=RoadWeather%2b) to get a map of valid weather stations. Once a station is found, copy the name according to the below picture and paste it in your `configuration.yaml` file as the `station` variable.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>

##### {% linkable_title Examples %}

```yaml
sensor:
  - platform: trafikverket_weatherstations
    name: Trafikverket Road WeatherStation Kungälv
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Kungälv
    type: road
  - platform: trafikverket_weatherstations
    name: Trafikverket Air WeatherStation Lanna
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Lanna
    type: air
    scan_interval: 600
```

*A good practice is to use `secrets.yaml` for all your API keys, username and password. You can read more about secrets [here](https://home-assistant.io/docs/configuration/secrets/).*
