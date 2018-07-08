---
layout: page
title: "Environment Canada Radar"
description: "Radar imagery from Environment Canada."
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

The `environment_canada` camera platform uses [Environment Canada](https://weather.gc.ca/mainmenu/weather_menu_e.html) as a source for current meteorological radar imagery.

- The platform automatically determines which radar station to use, according to this hierarchy:
  - Station code from sensor configuration
  - The closest station to latitude/longitude from sensor configuration
  - The closest station to latitude/longitude from Home Assistant core configuration

- If no name is given, the camera entity will be named `camera.<station_name>_radar`.

To add Environment Canada radar imagery to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: environment_canada
```

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
  description: The station code of a specific radar station to use. If provided, this station will be used and any lat/lon coordinates provided will be ignored. 
Station codes must be in the form of "ABC".
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
{% endconfiguration %}

Valid station codes are listed on [Wikipedia](https://en.wikipedia.org/wiki/Canadian_weather_radar_network#List_of_radars) (please drop the leading `C`).