---
title: "Environment Canada Weather"
description: "Weather data from Environment Canada."
logo: environment_canada.png
ha_category:
  - Weather
  - Sensor
  - Camera
ha_release: 0.95
ha_iot_class: Cloud Polling
---

The `environment_canada` weather platforms provide meteorological data for Canadian locations from [Environment Canada](https://weather.gc.ca/index_e.html).

The following device types and data are supported:

- [Weather](#weather) - Current conditions and forecasts
- [Sensor](#sensor) - Current conditions and alerts
- [Camera](#camera) - Radar imagery

## Location Selection

Each platform automatically determines which weather station's data to use. However, as station coordinates provided by Environment Canada are somewhat imprecise, in some cases you may need to override the automatic selection to use the desired station.

For each platform, the location to use is determined according to the following hierarchy:

  - Location ID specified in platform configuration (optional)
  - Closest station to latitude/longitude specified in platform configuration (optional
  - Closest station to latitude/longitude specified in Home Assistant core configuration

## Weather

The `environment_canada` weather platform populates a weather card with Environment Canada current conditions and forecast [data](https://weather.gc.ca/canada_e.html).

To add Environment Canada weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: environment_canada
```

- The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.
- If no name is given, the weather entity will be named `weather.<station_name>`.
- The platform automatically determines which weather station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station code based on [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv), or
    - A specific latitude/longitude

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
station:
  description: The station code of a specific weather station to use. Station codes must be in the form `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored.
  required: false
  type: string
name:
  description: Name to be used for the weather entity.
  required: false
  type: string
forecast:
  description: Specify hourly or daily forecasts. Valid values are 'daily' and 'hourly'.
  required: false
  type: string
  default: daily
{% endconfiguration %}

## Sensor

The `environment_canada` sensor platform creates sensors based on Environment Canada [current conditions](https://weather.gc.ca/canada_e.html) and [alerts](https://weather.gc.ca/warnings/index_e.html).

To add Environment Canada sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: environment_canada
```

- By default, a sensor entity is created for each monitored condition and each category of alert. Each sensor entity will be given the `device_id` of `sensor.<optional-name_><condition>`.
- The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.
- The platform automatically determines which weather station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station code based on [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv), or
    - A specific latitude/longitude

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
station:
  description: The station code of a specific weather station to use. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored. Station codes must be in the form of `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. 
  required: false
  type: string
name:
  description: Name to be used for the sensor entities.
  required: false
  type: string
monitored_conditions:
  description: The conditions to monitor. A sensor will be created for each condition.
  required: true
  type: list
  default: All keys
  keys:
    temperature:
      description: The current temperature, in ºC.
    dewpoint:
      description: The current dewpoint, in ºC.
    wind_chill:
      description: The current wind chill, in ºC.
    humidex:
      description: The current humidex, in ºC.
    pressure:
      description: The current air pressure, in kPa.
    tendency:
      description: The current air pressure tendency, e.g. "Rising" or "Falling".
    humidity:
      description: The current humidity, in %.
    visibility:
      description: The current visibility, in km.
    condition:
      description: A brief text statement of the current weather conditions, e.g. "Sunny".
    wind_speed:
      description: The current sustained wind speed, in km/h.
    wind_gust:
      description: The current wind gust, in km/h.
    wind_dir:
      description: The current cardinal wind direction, e.g. "SSW".
    high_temp:
      description: The next forecast high temperature, in ºC.
    low_temp:
      description: The next forecast low temperature, in ºC.
    pop:
      description: The next forecast probability of precipitation, in %.
    warnings:
      description: Current warning alerts.
    watches:
      description: Current watch alerts.
    advisories:
      description: Current advisory alerts.
    statements:
      description: Current special weather statements.
    endings:
      description: Alerts that have recently ended.
{% endconfiguration %}

## Camera

The `environment_canada` camera platform displays Environment Canada meteorological [radar imagery](https://weather.gc.ca/radar/index_e.html).

To add Environment Canada radar imagery to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: environment_canada
```

- If no name is given, the camera entity will be named `camera.<station_name>_radar`.
- The platform automatically determines which radar station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station ID from [this table](https://en.wikipedia.org/wiki/Canadian_weather_radar_network#List_of_radars) (remove the leading `C`, e.g. `XFT` or `ASBV`), or
    - A specific latitude/longitude

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest radar station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest radar station.
  required: inclusive
  type: float
station: 
  description: The station code of a specific radar station to use. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored.
  required: false
  type: string
name:
  description: Name to be used for the camera entity.
  required: false
  type: string
loop:
  description: Boolean setting to determine whether to display an animated GIF of images from the last 2 hours. If `false`, the latest still image will be displayed.
  required: false
  default: true
  type: boolean
precip_type:
  description: Determines whether to use the intensity bands for rain or snow. Valid values are RAIN and SNOW.
  required: false
  type: string
  default: RAIN from April to October, SNOW from November to March
{% endconfiguration %}
