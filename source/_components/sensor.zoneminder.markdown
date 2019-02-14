---
layout: page
title: "ZoneMinder Sensor"
description: "How to view ZoneMinder monitor functions and events within Home Assistant."
date: 2016-10-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Sensor
ha_release: 0.31
ha_iot_class: "Local Polling"
---

The `zoneminder` sensor platform lets you monitor the current state of your [ZoneMinder](https://www.zoneminder.com) install including the number of events, the current state of the cameras and ZoneMinder's current run state.

<p class='note'>
You must have the [ZoneMinder component](/components/zoneminder/) configured to use this sensor.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zoneminder
    include_archived: false
```

{% configuration %}
include_archived:
  description: Whether to include archived ZoneMinder events in event counts.
  required: false
  default: false
  type: boolean
monitored_conditions:
  description: Event count sensors to display in the frontend.
  required: false
  type: list
  keys:
    all:
      description: All events.
    month:
      description: Events in the last month.
    week:
      description: Events in the last week.
    day:
      description: Events in the last day.
    hour:
      description: Events in the last hour.
{% endconfiguration %}
