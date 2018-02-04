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
ha_release: 0.63.0
---

Showing weather information for air and road temperature provided by Trafikverket in Sweden.

#### Configuration
To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: trafikverket_weatherstations
    name: Trafikverket Road WeatherStation Kungälv
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Kungälv
    type: road
```

Configuration variables:

- **name** (*Required*): Unique name of the device in the frontend.
- **api_key** (*Required*): API key from Trafikverket
- **station** (*Required*): Name of the weather station
- **type** (*Required*): Defines which temperature you want (`air` or `road`)
- **scan_interval** (*Optional*): How frequently to query for new data (in seconds). Defaults to 300 seconds (5 minutes)

##### Get API key:
[https://api.trafikinfo.trafikverket.se/](https://api.trafikinfo.trafikverket.se/)

##### Get Trafikverket weather stations
[https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/606442.17/6886316.22/&Layers=RoadWeather%2b](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/606442.17/6886316.22/&Layers=RoadWeather%2b)

<p class='img'>
  <img src='{{site_root}}/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>

##### Examples

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
