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


The `zoneminder` sensor platform lets you monitor the current state of your [ZoneMinder](https://www.zoneminder.com) install including the number of events and the current state of the cameras.

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

Configuration variables:

- **include_archived** (*Optional*): Whether to include archived ZoneMinder events in event counts. Default is `false`.
