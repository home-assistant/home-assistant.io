---
layout: page
title: "BloomSky Sensor"
description: "Instructions on how to integrate the BloomSky sensors within Home Assistant."
date: 2016-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bloomsky.png
ha_category: Sensor
ha_release: 0.14
ha_iot_class: "Cloud Polling"
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
    - Pressure
    - UVIndex
    - Luminance
    - Voltage
```

Configuration variables:

- **monitored_conditions** array (*Required*): The sensors that you wish to monitor on all of your devices. Select from these options:
  - Humidity
  - Luminance
  - Pressure
  - Temperature
  - UVIndex
  - Voltage


More conditions are available using the [BloomSky binary sensor](/components/binary_sensor.bloomsky) component.
