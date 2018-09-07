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
ha_category: Environment
ha_iot_class: "Local Polling"
ha_release: 0.38
---


The `moon` sensor platform is tracking the moon phases.

## {% linkable_title Configuration %}

To enable the moon sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: moon
```

This sensor will return one of the following values: 
`new_moon`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full_moon`, `waning_gibbous`, `last_quarter` or `waning_crescent` .
