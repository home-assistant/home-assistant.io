---
title: NEA Singapore Sensor
description: Climate data from National Environment Agency Singapore.
ha_category:
  - Sensor
  - Weather
ha_release: 2021.7
ha_iot_class: "Cloud Polling"
ha_codeowners:
  - '@loongyh'
ha_domain: nea
ha_platforms:
  - sensor
  - weather
---

The `nea` platform uses meteorological data published by Singapore's National Environment Agency, retrieved from Data.gov.sg [Environment API](https://data.gov.sg/dataset?groups=environment&res_format=API).

The following device types and data are supported:

- [Location Selection](#location-selection)
- [Sensor](#sensor)
- [Weather](#weather)

## Location Selection

The `weather` and `sensor` platforms automatically determine which weather station's data to use.

For these platforms, the location to use is determined according to the following hierarchy:

- Closest station to latitude/longitude specified in platform configuration (optional)
- Closest station to latitude/longitude specified in Home Assistant configuration (default)

## Sensor

The `nea` sensor platform creates sensors based on the [Realtime Weather Readings] dataset.

Each sensor checks for new data according to the API's update intervals:

- 2-hour Weather Forecast: 30mins
- Air Temperature: 1min
- PM2.5: 1hr
- Pollutant Standards Index (PSI): 1hr
- Rainfall: 5mins
- Relative Humidity: 1min
- UV Index: 1hr
- Wind Direction: 1min
- Wind Speed: 1min

To add NEA sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nea
    monitored_conditions:
      - 2-hour-weather-forecast
      - air-temperature
      - pm25
      - psi
      - rainfall
      - relative-humidity
      - uv-index
      - wind-direction
      - wind-speed
```

The nearest monitoring stations can be manually selected according to the `latitude` and `longitude` coordinates you define in your configuration variables. Otherwise, the coordinates will be detected from your home `latitude` and `longitude` settings.

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
name:
  description: Name to be used for the entity ID, e.g.,  `sensor.<name>_<condition>`.
  required: false
  type: string
  default: nea
monitored_conditions:
  required: true
  description: Conditions to display in the frontend.
  type: list
  keys:
    2-hour-weather-forecast:
      description: Weather prediction for the next 2 hours.
    air-temperature:
      description: The current air temperature in °C.
    pm25:
      description: The current concentrations of particulate matter with a diameter of 2.5μm or less in µg/m³.
    psi:
      description: The current Pollutant Standards Index reading.
    rainfall:
      description: The current rainfall reading in mm.
    relative-humidity:
      description: The current relative humidity reading in %.
    uv-index:
      description: The current UV Index, readings are taken from 7AM-7PM.
    wind-direction:
      description: Current wind bearing in degrees.
    wind-speed:
      description: Current wind speed in km/h.
{% endconfiguration %}

## Weather

The `nea` weather platform populates a weather card with current conditions from the [Realtime Weather Readings] and forecast data from the [Weather Forecast](https://data.gov.sg/dataset/weather-forecast) dataset.

The following APIs are accessed for the current conditions:

- 2-hour-weather-forecast
- air-temperature
- relative-humidity
- wind-direction
- wind-speed

The following APIs are accessed to build a 5-day forecast:

- 24-hour-weather-forecast
- 4-day-weather-forecast

To add NEA weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: nea
```

The platform automatically determines which weather station to use based on the system's latitude/longitude settings.

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
name:
  description: Name to be used for the entity ID, e.g.,  `weather.<name>`.
  required: false
  type: string
  default: nea
{% endconfiguration %}

[Realtime Weather Readings]: https://data.gov.sg/dataset/realtime-weather-readings
