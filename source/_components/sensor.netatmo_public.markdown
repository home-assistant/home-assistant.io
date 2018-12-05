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
ha_category: Environment
ha_iot_class: "Cloud Polling"
ha_release: 0.77
---

The `netatmo_public` sensor allows you to expose data from [Netatmo](https://weathermap.netatmo.com/) to Home Assistant, even if you don't have a Netatmo device yourself. Currently the following conditions are supported:

* temperature
* pressure
* humidity
* rain
* windstrength
* guststrength

To enable the Netatmo sensor, you have to set up [netatmo](/components/netatmo/).

## {% linkable_title Configuration %}

Next, enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netatmo_public
    areas:
      - lat_ne: 40.719
        lon_ne: -73.735
        lat_sw: 40.552
        lon_sw: -74.105
        monitored_conditions:
          - temperature
          - pressure
          - humidity
          - rain
          - windstrength
          - guststrength
```

{% configuration %}
areas:
  description: The list contains one or more areas to add as sensors.
  required: true
  type: map
  keys:
    lat_ne:
      description: Latitude of north-eastern corner of area.
      required: true
      type: string
    lon_ne:
      description: Longitude of north-eastern corner of area.
      required: true
      type: string
    lat_sw:
      description: Latitude of south-western corner of area.
      required: true
      type: string
    lon_sw:
      description: Longitude of south-western corner of area.
      required: true
      type: string
    monitored_conditions:
      description: List of environment conditions to monitor.
      required: true
      type: list
    name:
      description: Name of the sensor.
      required: false
      type: string
      default: Netatmo Public Data
    mode:
      description: "How to calculate the value of the sensor if there are multiple stations reporting data. Accepts `max` or `avg`."
      required: false
      type: string
      default: avg
{% endconfiguration %}
