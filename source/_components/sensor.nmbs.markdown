---
layout: page
title: NMBS Sensor
description: "Sensor for Belgian railway station NMBS"
date: 2017-12-04 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: https://upload.wikimedia.org/wikipedia/commons/d/db/Sncb_nmbs.gif
ha_category: Transport
ha_release: 0.83
ha_iot_class: "Cloud Polling"
---

The `nmbs` platform will create sensors for monitoring travel time and information between 2 stations.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nmbs
    station_from: "Brugge"
    station_from: "Gent Dampoort"
    station_live: "Gent Dampoort"
```

{% configuration %}
station_from:
  description: The station where the connection departs
  required: true
  type: string
station_to:
  description: The station where the connection arrives
  required: true
  type: string
station_live:
  description: Setting this will create another sensor to monitor the liveboard in a station
  required: false
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
{% endconfiguration %}
