---
layout: page
title: "Moon Sensor"
description: "Instructions on how to integrate the moon sensor into Home Assistant."
date: 2017-02-03 07:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Weather
ha_iot_class: "Local Polling"
ha_release: 0.38
---


The `moon` sensor platform is tracking the moon phases.

To enable the moon sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: moon
```
This sensor will return one of the following values: 
`New moon`, `Waxing crescent`, `First quarter`, `Waxing gibbous`, `Full moon`, `Waning gibbous`, `Last quarter` or `Waning crescent` .
