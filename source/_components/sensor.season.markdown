---
layout: page
title: "Season Sensor"
description: "Instructions on how to add season sensors into Home Assistant."
date: 2017-07-04 07:00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
logo: home-assistant.png
ha_iot_class: "Local Polling"
ha_release: 0.53
---

This sensor will display the current astronomical or meteorological season (Spring, Summer, Autumn, Winter) based on the users setting in the config file.

All information about how the seasons work was taken from Wikipedia:

 - [https://en.wikipedia.org/wiki/Season#Astronomical](https://en.wikipedia.org/wiki/Season#Astronomical)
 - [https://en.wikipedia.org/wiki/Equinox](https://en.wikipedia.org/wiki/Equinox)
 - [https://en.wikipedia.org/wiki/Solstice](https://en.wikipedia.org/wiki/Solstice)


```yaml
# Example configuration.yaml entry
sensor:
  - platform: season
    type: astronomical
```

Configuration variables:

- **type** (*Optional*): Type of season definition. Options are `meteorological` or `astronomical`. Default is `astronomical`.
