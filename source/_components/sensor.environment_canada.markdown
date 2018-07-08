---
layout: page
title: "Environment Canada Sensor"
description: "Current weather conditions from Environment Canada."
date: 2017-07-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: environment_canada.jpg
ha_category: Weather
ha_release: 0.74
ha_iot_class: "Cloud Polling"
---

The `environment_canada` sensor platform uses [Environment Canada](https://weather.gc.ca/mainmenu/weather_menu_e.html) as a source for current meteorological data.

- The sensor automatically determines which weather station to use, according to this hierarchy:
  - Station code from sensor configuration
  - The closest station to latitude/longitude from sensor configuration
  - The closest station to latitude/longitude from Home Assistant core configuration

- One sensor entity is created for each monitored condition. Each sensor entity will be given the `device_id` of `ec_<optional-name>_<condition>`.
- A name is optional, but if multiple Environment Canada weather sensors are used a name can be used to distinguish them.
- The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.

To add Environment Canada sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: environment_canada
```

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
  description: The station code of a specific weather station to use. If provided, this station will be used and any lat/lon coordinates provided will be ignored. Station codes must be in the form of `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. 
  required: false
  type: string
name:
  description: Name to be used for the sensor entities.
  required: false
  type: string
monitored_conditions:
  description: The conditions to monitor. A sensor will be created for each condition for which data is available.
  required: true
  type: list
  default: All keys
  keys:
    temperature:
      description: The current temperature, in ºC
    dewpoint:
      description: The current dewpoint, in ºC
    wind_chill:
      description: The current wind chill, in ºC
    humidex:
      description: The current humidex, in ºC
    pressure:
      description: The current air pressure, in kPa
    tendency:
      description: The current air pressure tendency, e.g. "Rising" or "Falling"
    humidity:
      description: The current humidity, in %
    visibility:
      description: The current visibility, in km
    condition:
      description: A brief text statement of the current weather conditions, e.g. "Sunny"
    wind_speed:
      description: The current sustained wind speed, in km/h
    wind_gust:
      description: The current wind gust, in km/h
    wind_dir:
      description: The current cardinal wind direction, e.g. "SSW"
    high_temp:
      description: The next forecast high temperature, in ºC
    low_temp:
      description: The next forecast low temperature, in ºC
    pop:
      description: The next forecast probability of precipitation, in %
    warning:
      description: The title of the first warning currently issued
{% endconfiguration %}

Valid station codes are listed in [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv).