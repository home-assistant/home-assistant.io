---
layout: page
title: "OpenSky Network"
description: "Instructions on how to integrate OpenSky Network into Home Assistant."
date: 2017-04-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: opensky.png
ha_category: Sensor
featured: false
ha_release: 0.43
ha_iot_class: "Cloud Polling"
---

The `opensky` sensor allows one to track overhead flights in a given region. It uses crowd-sourced data from the [OpenSky Network](https://opensky-network.org/) public API. It will also fire Home Assistant events when flights enter and exit the defined region.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
sensor:
  - platform: opensky
    radius: 10
```

Configuration options for the OpenSky Network sensor:

- **radius** (*Required*): Radius of region to monitor, in kilometers
- **latitude** (*Optional*): Region latitude (defaults to home zone latitude)
- **longitude** (*Optional*): Region longitude (defaults to home zone longitude)
- **name** (*Optional*): Sensor name (defaults to `opensky`)

## Events

- **opensky_entry**: Fired when a flight enters the region
- **opensky_exit**: Fired when a flight exits the region

Both events have two attributes:

- **sensor**: Name of `opensky` sensor that fired the event
- **callsign**: Callsign of the flight
