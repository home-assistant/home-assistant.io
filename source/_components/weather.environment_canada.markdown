---
layout: page
title: "Environment Canada Weather"
description: "Weather data from Environment Canada."
date: 2018-02-15 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: environment_canada.png
ha_category: Weather
ha_release: 0.88
ha_iot_class: "Cloud Polling"
---

The `environment_canada` weather platform uses [Environment Canada](https://weather.gc.ca/mainmenu/weather_menu_e.html) as a source for current meteorological data.

The platform automatically determines which weather station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify:
  - A specific station code from [this CSV file](http://dd.weatheroffice.ec.gc.ca/citypage_weather/docs/site_list_towns_en.csv), or
  - A specific latitude/longitude

If no name is given, the weather entity will be named `weather.<station_name>`.

The sensor checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.

To add Environment Canada weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
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
  description: The station code of a specific weather station to use. Station codes must be in the form `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. If provided, this station will be used and any lat/lon coordinates provided will be ignored. 
  required: false
  type: string
name:
  description: Name to be used for the weather entity.
  required: false
  type: string
{% endconfiguration %}