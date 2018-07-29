---
layout: page
title: "Netatmo Public"
description: "Instructions on how to add sensors using Netatmo public data to Home Assistant."
date: 2018-07-22 21:18
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Sensor
ha_release: 0.75
---

The Netatmo Public sensor allows you to expose data from [Netatmo](https://weathermap.netatmo.com/) to Home Assistant, even if you don't have a Netatmo device yourself.

To enable the Netatmo sensor, you have to set up [netatmo](/components/netatmo/).

Then, enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netatmo_public
    areas:
      - lat_ne: 40.719
        lon_ne: -73.735
        lat_sw: 40.552
        lon_sw: -74.105
```

Configuration variables:

- **areas** (*Required*): Contains one or more areas to add as sensors.
  - **lat_ne** (*Required*): Latitude of north-eastern corner of area.
  - **lon_ne** (*Required*): Longitude of north-eastern corner of area.
  - **lat_sw** (*Required*): Latitude of south-western corner of area.
  - **lon_sw** (*Required*): Longitude of south-western corner of area.
  - **name** (*Optional*): Name of the sensor.
  - **type** (*Optional*): How to calculate the value of the sensor if there are multiple stations reporting data. Accepts `max` or `avg`. Defaults to `max`.
