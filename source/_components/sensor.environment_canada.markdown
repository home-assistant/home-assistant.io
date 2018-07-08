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
  - Closest station to latitude / longitude from sensor configuration
  - Closest station to latitude / longitude from Home Assistant core configuration

- One sensor entity is created for each monitored condition. Each sensor entity will be given the `device_id` of `ec_<optional-name>_<condition>`.
- A name is optional, but if multiple Environment Canada weather sensors are used a name can be used to distinguish them.
- The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.

To add Environment Canada sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: environment_canada
    latitude: 50
    longitude: -100
    station: ON/s0000430
    name: Ottawa
    monitored_conditions:
      - temperature
      - dewpoint
      - wind_chill
      - humidex
      - pressure
      - tendency
      - humidity
      - visibility
      - condition
      - wind_speed
      - wind_gust
      - wind_dir
      - high_temp
      - low_temp
      - pop
      - warning
```

Configuration variables:

- **monitored_conditions** (*Optional*): A list of the conditions to monitor. 
This list must be a subset of those listed above. 
If no entry is provided, all of the available conditions will be monitored.
- **latitude / longitude** (*Optional*): A set of coordinates to use when finding the closest weather station. If not provided, the global Home Assistant coordinates are used.
- **station** (*Optional*): The station code of a specific weather station to use. 
If provided, this station will be used and any lat/lon coordinates provided will be ignored. 
Station codes must be in the form of `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. 
Valid codes are listed in [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv).
- **name** (*Optional*): The name you would like to assign to the sensor entities.