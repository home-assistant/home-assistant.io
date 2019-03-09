---
layout: page
title: "GTT"
description: "Instructions on how to integrate timetable data for a GTT stop within Home Assistant."
date: 2018-11-13 12:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Transport
logo: gtt.png
ha_iot_class: "Cloud Polling"
ha_release: 0.85
---


The `gtt` sensor will give you the departure time of the next bus at the given stop.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gtt
    stop: '1080'
    bus_name: '58B'
```
{% configuration %}
stop:
  description: The name of the stop.
  required: true
  type: string
bus_name:
  description: The name of the choosen bus.
  required: false
  type: string
{% endconfiguration %}

The data is coming from the [gtt.to.it](http://www.gtt.to.it/cms/) website.
