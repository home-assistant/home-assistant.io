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
  - Closest station to latitude / longitude from sensor configuration
  - Closest station to latitude / longitude from Home Assistant core configuration

- If no name is given, the camera entity will be named `camera.<station_name>_radar`.

To add Environment Canada radar imagery to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: environment_canada
    latitude: 50
    longitude: -100
    station: XFT
    name: Ottawa Radar
    loop: True
```

Configuration variables:

- **latitude / longitude** (*Optional*): A set of coordinates to use when finding the closest radar station. If not provided, the global Home Assistant coordinates are used.
- **station** (*Optional*): The station code of a specific radar station to use. 
If provided, this station will be used and any lat/lon coordinates provided will be ignored. 
Station codes must be in the form of `ABC`. 
Valid station codes are listed on [Wikipedia](https://en.wikipedia.org/wiki/Canadian_weather_radar_network#List_of_radars) (please drop the leading `C`).
- **name** (*Optional*): Name to be used for the camera entity.
- **loop** (*Optional*): Boolean setting to determine whether to display an animated GIF of images from the last 2 hours.
Defaults to `True`. If `False`, the latest still image will be displayed.