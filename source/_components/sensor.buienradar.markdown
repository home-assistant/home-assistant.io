---
layout: page
title: "Buienradar"
description: "Instructions how to integrate buienradar.nl sensor within Home Assistant."
date: 2017-05-15 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: Weather
ha_release: 0.47
---


The `buienradar` platform uses [buienradar.nl](http://buienradar.nl/) as an source for current meteorological data for your location. The 
weather forecast is delivered by Buienradar, who provides a webservice that provides detailed weather information for users in The Netherlands.
The relevant weatherstation used will be automatically selected based on the location specified in the Home Assistant configuration (or in the buienradar weather/sensor component).

To integrate `buienradar` with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: buienradar
    monitored_conditions:
      - symbol
      - humidity
      - temperature
      - windspeed
      - pressure
```

Configuration variables:

- **platform**  (*Required*): buienradar.
- **latitude**  (*Optional*): latitude to use for selection of data source location. Longitude & latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.
- **longitude** (*Optional*): longitude to use for selection of data source location. Longitude & latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.
- **monitored_conditions** array (*Required*): one or more conditions to display in the frontend.
  - **stationname**: the name of the selected meteo-station.
  - **symbol**: A symbol for the current weather.
  - **humidity**: The relative humidity (%).
  - **temperature**: The current temperature (in C).
  - **groundtemperature**: The current ground temperature (in C).
  - **windspeed**: The wind speed in m/s.
  - **windforce**: The wind speed/force in Bft.
  - **winddirection**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **windazimuth**: Where the wind is coming from: N (North),Z (south), NO (Noth-East), etc..
  - **pressure**: The sea-level air pressure in hPa.
  - **visibility**: Visibility in meters (m).
  - **windgust**: The windspeed of wind gusts (m/s).
  - **precipitation**: the amount of precipitation/rain in mm/h.
  - **irradiance**: Sun intensity in Watt per square meter (W/m2).

Full configuration example where location is manually specified:

```yaml
# Example configuration.yaml entry
- platform: buienradar
    latitude: 51.65
    longitude: 5.70
    monitored_conditions:
      - stationname
      - symbol
      - humidity
      - temperature
      - groundtemperature
      - windspeed
      - windforce
      - winddirection
      - windazimuth
      - pressure
      - visibility
      - windgust
      - precipitation
      - irradiance
```
  
