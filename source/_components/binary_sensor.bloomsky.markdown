---
layout: page
title: "BloomSky Binary Sensor"
description: "Instructions on how to set up BloomSky binary sensors within Home Assistant."
date: 2016-02-22 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Binary Sensor
---

The `bloomsky` binary sensor platform allows you to get data from your BloomSky device.

To get your BloomSky binary sensors working with Home Assistant, follow the instructions for the [BloomSky component](/components/bloomsky/) first.

To use your BloomSky binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bloomsky
```

