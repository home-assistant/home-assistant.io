---
title: "Buienradar Sensor"
description: "Instructions on how to integrate buienradar.nl sensor within Home Assistant."
logo: buienradar.png
ha_category:
  - Weather
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: buienradar
---

The `buienradar` platform uses [buienradar.nl](https://buienradar.nl/) as a source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a webservice that provides detailed weather information for users in The Netherlands. The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the buienradar weather/sensor component). A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0).

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

{% configuration %}
name:
  description: You can specify a name of the component, but do not have to. See more info below.
  required: false
  type: string
latitude:
  description: Latitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration, but can be overridden/changed in this integration to select a different location for buienradar.nl.
  required: false
  type: float
longitude:
  description: Longitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration, but can be overridden/changed in this integration to select a different location for buienradar.nl.
  required: false
  type: float
timeframe:
  description: Minutes to look ahead for precipitation forecast (minimum 5, maximum 120).
  required: false
  default: 60
  type: integer
monitored_conditions:
  description: One or more conditions to display in the frontend. See [the Buienradar.nl website](https://www.buienradar.nl/overbuienradar/legenda) for a detailed explanation of each one.
  required: true
  type: list
  keys:
    stationname:
      description: The name of the selected meteo-station.
    barometerfc:
      description: A numeric barametric forecast (1 to 7)
    barometerfcname:
      description: "A textual representation of the barometer forecast (eg: Thunderstorms, Stable, etc.)."
    conditioncode:
      description: "A symbol and a unique code identifying the current weather condition ([a..z])."
    condition:
      description: A symbol and the current weather condition (`clear`, `cloudy`, `fog`, `rainy`, `snowy` or `lightning`).
    conditiondetailed:
      description: A symbol and detailed current weather condition (`clear`, `partlycloudy`, `cloudy`, `partlycloudy-fog`, `partlycloudy-light-rain`, `partlycloudy-rain`, `light-rain`, `rainy`, `snowy-rainy`, `partlycloudy-light-snow`, `partlycloudy-snow`, `light-snow`, `snowy`, `partlycloudy-lightning` or `lightning`).
    conditionexact:
      description: A symbol with the full current weather condition (in English).
    symbol:
      description: A symbol for the current weather with the full current condition (in Dutch).
    feeltemperature:
      description: "The current feel temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
    humidity:
      description: The relative humidity (%).
    temperature:
      description: "The current temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
    groundtemperature:
      description: "The current ground temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
    windspeed:
      description: "The wind speed in [km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour)."
    windforce:
      description: "The wind speed/force in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)."
    winddirection:
      description: "Where the wind is coming from: N (North), Z (south), NO (North-East), etc."
    windazimuth:
      description: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
    pressure:
      description: "The sea-level air pressure in [hPa](https://en.wikipedia.org/wiki/Hectopascal)."
    visibility:
      description: "Visibility in meters ([m](https://en.wikipedia.org/wiki/Metre))."
    windgust:
      description: "The wind speed of wind gusts ([m/s](https://en.wikipedia.org/wiki/M/s))."
    precipitation:
      description: The amount of precipitation/rain in mm/h.
    precipitation_forecast_average:
      description: The average expected precipitation/rain in mm/h within the given time-frame.
    precipitation_forecast_total:
      description: The total expected precipitation/rain in mm within the given time-frame. The total expected rain in the configured time-frame will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with time-frame configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If time-frame is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
    irradiance:
      description: "Sun intensity in Watt per square meter ([W/m2](https://en.wikipedia.org/wiki/W/m2))."
    rainlast24hour:
      description: The rain over the last 24 hours (in mm).
    rainlasthour:
      description: The rain over the last hour (in mm). 
    temperature_1d:
      description: "The forecasted temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
    mintemp_1d:
      description: "The forecasted minimum temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
    rainchance_1d:
      description: The forecasted chance for rain (%).
    sunchance_1d:
      description: The forecasted chance for sun (%).
    rain_1d:
      description: "The forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre); the average of minrain_1d and maxrain_1d."
    minrain_1d: 
      description: "The minimum forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre)."
    maxrain_1d:
      description: "The maximum forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre)."
    windazimuth_1d:
      description: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise. (derived from winddirection_1d)
    winddirection_1d:
      description: "Where the wind will be coming from: N (North), Z (south), NO (North-East), etc."
    windforce_1d:
      description: "The expected windforce in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)."
    windspeed_1d:
      description: "The expected windspeed in [m/s](https://en.wikipedia.org/wiki/M/s) (derived from windforce_1d)."
    conditioncode_1d:
      description: Symbol and condition code of the expected condition.
    condition_1d:
      description: Symbol and expected condition.
    conditiondetailed_1d:
      description: Symbol and detailed expected condition.
    conditionexact_1d:
      description: Symbol and full expected condition (in English).
    symbol_1d:
      description: Symbol and full expected condition (in Dutch).
{% endconfiguration %}

## The `Name` Variable

If you specify a name, the sensors will get an entity name of `sensor.[name]_[default sensor display name]`, for example:

- `sensor.lopik_temperature`, since the name of the sensor is set to `lopik` and the default display name for monitored condition `temperature` is `Temperature`.
- `sensor.lopik_wind_force`, since the name of the sensor is set to `lopik` and the default display name for monitored condition `windforce` is `Wind force`.

If no name is specified the sensors will be called `sensor.br_[default sensor display name]`, for example:

- `sensor.br_wind_speed`, since no name has been set for the sensor and the default display name for monitored condition `windspeed` is `Wind speed`.
- `sensor.br_ground_temperature`, since no name has been set for the sensor and the default display name for monitored condition `groundtemperature` is `Ground Temperature`.

## Daily forecasts

Conditions above marked with `1d` are daily forecasts. To get forecast for different day, replace the number
in `_1d` part of the sensor name. Valid values are from `1` to `5`.

## Configuration examples

Full configuration example (excluding forecasted conditions) where location is manually specified:

```yaml
# Example configuration.yaml entry
- platform: buienradar
  name: "volkel"
  # Force 'Meetstation Volkel' to be used:
  latitude: 51.65
  longitude: 5.70
  monitored_conditions:
    - stationname
    - barometerfc
    - barometerfcname
    - conditioncode
    - condition
    - conditiondetailed
    - conditionexact
    - symbol
    - feeltemperature
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
    - rainlast24hour
    - rainlasthour
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
      - mintemp_1d
      - rainchance_1d
      - rainchance_2d
      - sunchance_1d
      - sunchance_2d
      - rain_1d
      - rain_2d
      - minrain_1d
      - maxrain_1d
      - windforce_1d
      - windforce_2d
      - windspeed_1d
      - windspeed_2d
      - winddirection_1d
      - winddirection_2d
      - windazimuth_1d
      - windazimuth_2d
```

[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
> Buienradar makes free weather-data available for use by individuals and businesses (website/intranet). The use of the weather-data is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your usage or to request permission.
