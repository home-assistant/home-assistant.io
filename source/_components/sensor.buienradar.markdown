---
layout: page
title: "Buienradar"
description: "Instructions how to integrate buienradar.nl sensor within Home Assistant."
date: 2017-05-15 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: buienradar.png
ha_category: Weather
ha_release: 0.47
ha_iot_class: "Cloud Polling"
---


The `buienradar` platform uses [buienradar.nl](http://buienradar.nl/) as an source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a webservice that provides detailed weather information for users in The Netherlands. The relevant weatherstation used will be automatically selected based on the location specified in the Home Assistant configuration (or in the buienradar weather/sensor component). A map of all available weatherstations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0). 

The selected weatherstation will provide all weather data, with the exception of the forecasted precipitation. The forecasted precipitation data will be retrieved from buienradar using your actual gps-location (and not the location of the nearest weatherstation).

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

- **name**  (*Optional*): You can specify a name of the component, but do not have to. If you specify a name, the sensors will get an entity name of `sensor.[name]_[default sensor display name]`, for example: 
  - `sensor.lopik_temperature`, since the name of the sensor is set to `lopik` and the default display name for monitored condition `temperature` is `Temperature` 
  - `sensor.lopik_wind_force`, since the name of the sensor is set to `lopik` and the default display name for monitored condition `windforce` is `Wind force`
  
  If no name is specified the sensors will be called `sensor.br_[default sensor display name]`, for example:
  - `sensor.br_wind_speed`, since no name has been set for the sensor and the default display name for monitored condition `windspeed` is `Wind speed`
  - `sensor.br_ground_temperature`, since no name has been set for the sensor and the default display name for monitored condition `groundtemperature` is `Ground Temperature`
- **latitude** (*Optional*): Latitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.nl.
- **longitude** (*Optional*): Longitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.nl.
- **timeframe** (*Optional*): Minutes to look ahead for precipitation forecast (5..120) [default: 60].
- **monitored_conditions** array (*Required*): One or more conditions to display in the frontend.
  - **stationname**: The name of the selected meteo-station.
  - **symbol**: A symbol for the current weather.
  - **humidity**: The relative humidity (%).
  - **temperature**: The current temperature (in C).
  - **groundtemperature**: The current ground temperature (in C).
  - **windspeed**: The wind speed in m/s.
  - **windforce**: The wind speed/force in Bft.
  - **winddirection**: Where the wind is coming from: N (North),Z (south), NO (Noth-East), etc.
  - **windazimuth**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **pressure**: The sea-level air pressure in hPa.
  - **visibility**: Visibility in meters (m).
  - **windgust**: The windspeed of wind gusts (m/s).
  - **precipitation**: The amount of precipitation/rain in mm/h.
  - **precipitation_forecast_average**: The average expected precipitation/rain in mm/h within the given timeframe.
  - **precipitation_forecast_total**: The total expected precipitation/rain in mm within the given timeframe. The total expected rain in the configured timeframe will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with timeframe configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If timeframe is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
  - **irradiance**: Sun intensity in Watt per square meter (W/m2).
  
Full configuration example where location is manually specified:

```yaml
# Example configuration.yaml entry
- platform: buienradar
    name: 'volkel'
    # Force 'Meetstation Volkel' to be used:
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
      - precipitation_forecast_average
      - precipitation_forecast_total
```

[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
> Buienradar makes free weatherdata available for use by individuals and businesses (website/intranet). The use of the weatherdata is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your usage or to request permission.
