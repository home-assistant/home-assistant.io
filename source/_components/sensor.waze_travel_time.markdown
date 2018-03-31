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
ha_release: 0.67
---

The `waze_travel_time` sensor provides travel time from the [Waze](https://www.waze.com/).

Unit system is set to metric system.

## {% linkable_title Configuration %}

To use this sensor in your installation, add the following `abode` section to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: waze_travel_time
    origin: Montréal, QC
    destination: Québec, QC
    region: 'US'
    outputs:
      - duration
      - distance
      - route
```

{% configuration %}
origin:
  description: Enter the starting address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma).
  required: true
  type: string
destination:
  description: Enter the destination address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma).
  required: true
  type: string
region:
  description: Choose one of the available regions from 'EU', 'US', 'NA' (equivalent to 'US') or 'IL'.
  required: true
  type: string
outputs:
  description: Conditions to display in the frontend. At least one output type (see below) is required.
  required: true
  type: list
  keys:
    duration:
      description: The sensor will display the duration of the best-chosen route, in min.
    distance:
      description: The sensor will display the distance of the best-chosen route, in km.
    route:
      description: The sensor will display the main steps of the best-chosen route.
name:
  description: A name to display on the sensor.
  required: false
  default: "Waze Travel Time"
  type: string
{% endconfiguration %}
