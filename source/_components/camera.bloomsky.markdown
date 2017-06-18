---
layout: page
title: "BloomSky Camera"
description: "Instructions how to integrate the BloomSky camera within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Camera
ha_release: 0.13
ha_iot_class: "Local Polling"
---


The `bloomsky` camera component allows you to view the current photo created by the camera in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with [BloomSky sensors](/components/sensor.bloomsky).

To enable this camera in your installation, set up the [BloomSky component](/components/bloomsky) with your API key and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: bloomsky
```
