---
layout: page
title: "ARWN Sensor"
description: "Instructions on how to integrate ARWN within Home Assistant."
date: 2016-10-20 15:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.31
ha_iot_class: "Local Polling"
---

The `arwn` sensor platform is a client for the [Ambient Radio Weather Network](http://github.com/sdague/arwn) project. This collects weather station data and makes it available in an MQTT subtree.

To use your ARWN setup, you must already have configured the [MQTT](mqtt) platform. Then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arwn
```

Currently all temperatures, barometers, moisture, rain, and wind sensors will be displayed.
