---
layout: page
title: "Environment Canada Weather"
description: "Weather from Environment Canada."
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

The `environment_canada` weather platform uses [Environment Canada](https://weather.gc.ca/mainmenu/weather_menu_e.html) as a source for current meteorological data.

- The platform automatically determines which weather station to use, according to this hierarchy:
  - Station code from sensor configuration
  - Closest station to latitude / longitude from sensor configuration
  - Closest station to latitude / longitude from Home Assistant core configuration

- If no name is given, the weather entity will be named `weather.<station_name>`.
- The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.

To add Environment Canada weather to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: environment_canada
    latitude: 50
    longitude: -100
    station: ON/s0000430
    name: Ottawa
```

Configuration variables:

- **latitude / longitude** (*Optional*): A set of coordinates to use when finding the closest weather station. If not provided, the global Home Assistant coordinates are used.
- **station** (*Optional*): The station code of a specific weather station to use. 
If provided, this station will be used and any lat/lon coordinates provided will be ignored. 
Station codes must be in the form of `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. 
Valid codes are listed in [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv).
- **name** (*Optional*): Name to be used for the weather entity.