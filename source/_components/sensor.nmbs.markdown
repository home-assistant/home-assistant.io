---
layout: page
title: "NMBS Sensor"
description: "Instructions on how to integrate timetable data for traveling on the NMBS Belgian Railway within Home Assistant."
date: 2018-11-24 13:47
sidebar: true
comments: false
sharing: true
footer: true
logo: sncb_nmbs.gif
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.84
---

The `nmbs` platform will create sensors for monitoring travel time and information between 2 stations.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nmbs
    station_from: "STATION_1"
    station_from: "STATION_2"
    station_live: "STATION_1"
```

{% configuration %}
station_from:
  description: The station where the connection departs.
  required: true
  type: string
station_to:
  description: The station where the connection arrives.
  required: true
  type: string
station_live:
  description: Setting this will create another sensor to monitor the liveboard in a station.
  required: false
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
{% endconfiguration %}
