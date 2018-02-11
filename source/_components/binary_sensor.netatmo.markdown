---
layout: page
title: "Netatmo Binary Sensor"
description: "Instructions how to integrate Netatmo binary sensor into Home Assistant."
date: 2016-09-19 15:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Binary Sensor
ha_release: 0.31
---

### {% linkable_title Basic Configuration %}

The `netatmo` binary sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) camera. This component allows you to get the latest event seen by the camera.

To enable the Netatmo binary sensor, you have to set up [netatmo](/components/netatmo/), this will use discovery to add your binary sensor.

### {% linkable_title Advanced configuration %}

If you want to select a specific sensor, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: netatmo
  home: home_name
  timeout: 90
  cameras:
    - camera_name1
  welcome_sensors:
    - Someone known
    - Someone unknown
    - Motion
  presence_sensors:
    - Outdoor motion
    - Outdoor human
    - Outdoor animal
    - Outdoor vehicle
```

Configuration variables:

- **home** (*Optional*): Will use the cameras of this home only.
- **timeout** (*Optional*): The Welcome/Presence binary sensors will stay on for X seconds after detection. (default: 90)
- **cameras** array (*Optional*): Cameras to use. Multiple entities allowed.
    - 'camera_name': Name of the camera to display.
- **welcome_sensors** array (*Optional*): List of monitored conditions.
    - 'Someone known'
    - 'Someone unknown'
    - 'Motion'
- **presence_sensors** array (*Optional*): List of monitored conditions.
    - 'Outdoor motion'
    - 'Outdoor human'
    - 'Outdoor animal'
    - 'Outdoor vehicle'

If **home** and **cameras** is not provided, all cameras will be used. If multiple cameras are available then each monitored conditions will create a specific sensor for each camera
