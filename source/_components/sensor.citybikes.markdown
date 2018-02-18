---
layout: page
title: "CityBikes API sensor"
description: "Instructions on how to integrate data from the CityBikes API into Home Assistant."
date: 2017-06-25 14:20
sidebar: true
comments: false
sharing: true
footer: true
logo: citybikes.png
ha_category: Sensor
ha_release: 0.49
---


The `citybikes` sensor platform monitors bike availability at bike sharing stations in a chosen area. The data is provided by [CityBikes](https://citybik.es/#about), which supports bike sharing systems all around the world.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry (using radius)
sensor:
  - platform: citybikes
    radius: 500
```

Configuration options:

- **name** (*Optional*): The base name of this group of monitored stations. The entity ID of every monitored station in this group will be prefixed with this base name, in addition to the network ID.
- **network** (*Optional*):  The name of the bike sharing system to poll. Defaults to the system that operates in the monitored location.
- **latitude** (*Optional*):  Latitude of the location, around which bike stations are monitored. Defaults to the latitude in your `configuration.yaml` file.
- **longitude** (*Optional*):  Longitude of the location, around which bike stations are monitored. Defaults to the longitude in your `configuration.yaml` file.
- **radius** (*Optional*):  The radius (in meters or feet, depending on the Home Assistant configuration) around the monitored location. Only stations closer than this distance will be monitored.
- **stations** array (*Optional*): A list of specific stations to monitor. The list should contain station `ID`s or `UID`s, which can be obtained from the CityBikes API.

Additional configuration samples:

```yaml
# Example configuration.yaml entry (using a list of stations)
sensor:
  - platform: citybikes
    name: Work Stations
    stations:
      - 123
      - 145
      - 436
```
