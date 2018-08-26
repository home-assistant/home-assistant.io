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
ha_release: 0.66.0
---

Showing weather information provided by [Trafikverket](https://www.trafikverket.se/) weather stations in Sweden. 


Potential use cases:
-	Get weather data in general
-	You live near a weather station and want to know the current weather conditions at home
-	Setup automations for your car heating system. If the road is frozen along the way to work, you might want the car heating system to start earlier.

##### {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: trafikverket_weatherstation
    name: Trafikverket Road WeatherStation Kungälv
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Kungälv
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
        - wind_direction
        - wind_direction_text
        - wind_speed
```

{% configuration %}
- **name** (*Required*):  
  description: Your unique name of the device in the frontend.  
  type: string  
- **api_key** (*Required*):  
  description: Your personal API key from Trafikverket.  
  type: string  
- **station** (*Required*):  
  description: Name of the weather station from Trafikverket.  
  type: string  
- **monitored_conditions** array (*Required at least one*): Conditions to display in the frontend.  
(*Note: Not all stations have measurement data for below types*)  
  - **air_temp**: Air temperature.  
  - **road_temp**: The temperature in the road.  
  - **humidity**: Relative humidity.  
  - **precipitation**: Type of precipitation (Swedish text).  
  - **wind_direction**: Wind direction in degrees.  
  - **wind_direction_text**: Rough direction in twelve variants (Swedish text).  
  - **wind_speed**: Average wind force during the last 10 minutes.  
    
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
  - platform: trafikverket_weatherstation
    name: Trafikverket Road WeatherStation Kungälv
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Kungälv
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
        - wind_direction
        - wind_direction_text
        - wind_speed
  - platform: trafikverket_weatherstation
    name: Trafikverket Air WeatherStation Lanna
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Lanna
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
    scan_interval: 600
  - platform: trafikverket_weatherstation
    name: Trafikverket Precipitation WeatherStation Nöbbele
    api_key: eXXcbXXXacXXXXc39XX3aXXX4aXX46XX
    station: Nöbbele
    monitored_conditions:
        - air_temp
        - road_temp
        - humidity
        - precipitation
    scan_interval: 600
```
