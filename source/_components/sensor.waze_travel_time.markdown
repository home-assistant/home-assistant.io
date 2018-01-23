---
layout: page
title: "Waze Travel Time"
description: "Instructions on how to add Waze travel time to Home Assistant."
date: 2018-01-23 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: waze.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.61
---

Sensor to provide travel time from the [WazeRouteCalculator](https://github.com/kovacsbalu/WazeRouteCalculator).

The sensor will update the travel time every 5 minutes by default.
Unit system is set to metric system (at least for the moment).

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: waze_travel_time
    name: "Example Name"
    origin: Montréal, QC
    destination: Québec, QC
    region: 'US'
    update_interval: '00:03'
    outputs:
     - duration
     - distance
     - route
```

Configuration variables:

- **origin** (*Required*): Enter the starting address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma).
- **destination** (*Required*): Enter the destination address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma).
- **region** (*Required*): Choose one of the available regions from 'EU', 'US', 'NA' (equivalent to 'US'), 'IL'. Default value is 'US'.
- **outputs** (*Required*): At least one output type (see below) is required.
  - *duration*: The sensor will display the duration of the best chosen route, in min.
  - *distance*: The sensor will display the distance of the best chosen route, in km.
  - *route*: The sensor will display the main steps of the best chosen route.
- **name** (*Optional*): A name to display on the sensor. The default is "Waze Travel Time".
- **update_interval** (*Optional*): Update interval using the template 'hh:mm', 'hh:mm:ss'. Default value is '00:05', i.e. measurement is made every 5 minutes.
