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


The `buienradar` platform uses [buienradar.nl](http://buienradar.nl/) as an source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a web service that provides detailed weather information for users in The Netherlands. The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the buienradar weather/sensor component). A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0). 

The selected weather station will provide all weather data, with the exception of the forecasted precipitation. The forecasted precipitation data will be retrieved from buienradar using your actual gps-location (and not the location of the nearest weather station).

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
  - **conditioncode**: A symbol and a unique code identifying the current weather condition ([a..z]).
  - **condition**: A symbol and the current weather condition (clear, cloudy, fog, rainy, snowy, lightning).
  - **conditiondetailed**: A symbol and detailed current weather condition (clear, partlycloudy, cloudy, partlycloudy-fog, partlycloudy-light-rain, partlycloudy-rain, light-rain, rainy, snowy-rainy, partlycloudy-light-snow, partlycloudy-snow, light-snow, snowy, partlycloudy-lightning, lightning).
  - **conditionexact**: A symbol with the full current weather condition (in English).
  - **symbol**: A symbol for the current weather with the full current condition (in Dutch).
  - **humidity**: The relative humidity (%).
  - **temperature**: The current temperature (in [C](https://en.wikipedia.org/wiki/Celsius)).
  - **groundtemperature**: The current ground temperature (in [C](https://en.wikipedia.org/wiki/Celsius)).
  - **windspeed**: The wind speed in [m/s](https://en.wikipedia.org/wiki/M/s).
  - **windforce**: The wind speed/force in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale).
  - **winddirection**: Where the wind is coming from: N (North),Z (south), NO (North-East), etc.
  - **windazimuth**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **pressure**: The sea-level air pressure in [hPa](https://en.wikipedia.org/wiki/Hectopascal).
  - **visibility**: Visibility in meters ([m](https://en.wikipedia.org/wiki/Metre)).
  - **windgust**: The wind speed of wind gusts ([m/s](https://en.wikipedia.org/wiki/M/s)).
  - **precipitation**: The amount of precipitation/rain in mm/h.
  - **precipitation_forecast_average**: The average expected precipitation/rain in mm/h within the given time-frame.
  - **precipitation_forecast_total**: The total expected precipitation/rain in mm within the given time-frame. The total expected rain in the configured time-frame will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with time-frame configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If time-frame is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
  - **irradiance**: Sun intensity in Watt per square meter ([W/m2](https://en.wikipedia.org/wiki/W/m2)).
  - **temperature_1d** [<sup>[1d]</sup>](#1d): The forecasted temperature (in [C](https://en.wikipedia.org/wiki/Celsius)).
  - **mintemp_1d** [<sup>[1d]</sup>](#1d): The forecasted minimum temperature (in [C](https://en.wikipedia.org/wiki/Celsius)).
  - **rainchance_1d** [<sup>[1d]</sup>](#1d): The forecasted chance for rain (%).
  - **sunchance_1d** [<sup>[1d]</sup>](#1d): The forecasted chance for sun (%).
  - **rain_1d** [<sup>[1d]</sup>](#1d): The forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre).
  - **snow_1d** [<sup>[1d]</sup>](#1d): The forecasted amount of snow in [cm](https://en.wikipedia.org/wiki/Centimetre).
  - **windforce_1d** [<sup>[1d]</sup>](#1d): The expected windforce in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale).
  - **conditioncode_1d** [<sup>[1d]</sup>](#1d): Symbol and condition code of the expected condition.
  - **condition_1d** [<sup>[1d]</sup>](#1d): Symbol and expected condition.
  - **conditiondetailed_1d** [<sup>[1d]</sup>](#1d): Symbol and detailed expected condition.
  - **conditionexact_1d** [<sup>[1d]</sup>](#1d): Symbol and full expected condition (in English).
  - **symbol_1d** [<sup>[1d]</sup>](#1d): Symbol and full expected condition (in Dutch).


## Daily forecasts

Conditions above marked with <a name="1d">[1d]</a> are daily forecasts. To get forecast for different day, replace the number
in `_1d` part of the sensor name. Valid values are from `1` to `5`.


## Configuration examples

Full configuration example (excluding forecasted conditions) where location is manually specified:

```yaml
# Example configuration.yaml entry
- platform: buienradar
    name: 'volkel'
    # Force 'Meetstation Volkel' to be used:
    latitude: 51.65
    longitude: 5.70
    monitored_conditions:
      - stationname
      - conditioncode
      - condition
      - conditiondetailed
      - conditionexact
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


Configuration example with current condition and (some) forecasted values:

```yaml
# Weather prediction
sensor:
  - platform: buienradar
    monitored_conditions:
      # current condition:
      - condition
      - conditioncode
      - conditiondetailed
      - conditionexact
      - symbol
      # conditions for forecasted data:
      - symbol_1d
      - symbol_2d
      - symbol_3d
      - symbol_4d
      - symbol_5d
      - temperature_1d
      - temperature_2d
      - temperature_3d
      - temperature_4d
      - temperature_5d
      - rainchance_1d
      - rainchance_2d
      - rainchance_3d
      - rainchance_4d
      - rainchance_5d
      - sunchance_1d
      - sunchance_2d
      - sunchance_3d
      - sunchance_4d
      - sunchance_5d
      - rain_1d
      - rain_2d
      - rain_3d
      - rain_4d
      - rain_5d
```

[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
> Buienradar makes free weather-data available for use by individuals and businesses (website/intranet). The use of the weather-data is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your usage or to request permission.
