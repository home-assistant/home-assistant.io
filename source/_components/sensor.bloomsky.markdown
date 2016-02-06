---
layout: component
title: "BloomSky"
description: "Instructions how to integrate the BloomSky sensors within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Sensor
---


The `bloomsky` sensor component allows you to view the measurements made by sensors in the [BloomSky](https://www.bloomsky.com) weather station. This can work in concert with the [BloomSky camera](/components/camera.bloomsky).

To enable these sensors in your installation, set up the [BloomSky component](/components/bloomsky) with your API key add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bloomsky
  monitored_conditions:
    - Temperature
    - Humidity
    - Rain
    - Pressure
    - UVIndex
    - Luminance
    - Night
```

Configuration variables:

- **api_key** *Required*: Your BloomSky API key, obtained from your [BloomSky dashboard](https://dashboard.bloomsky.com) (click `developers` in the bottom left of the screen)
- **monitored_conditions** *Required*: The sensors that you wish to monitor on all of your devices. Select from these options:
  - Humidity
  - Luminance
  - Night
  - Pressure
  - Rain
  - Temperature
  - UVIndex
