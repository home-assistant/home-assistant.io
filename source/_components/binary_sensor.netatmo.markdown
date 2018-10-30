---
layout: page
title: "Netatmo Binary Sensor"
description: "Instructions on how to integrate Netatmo binary sensor into Home Assistant."
date: 2016-09-19 15:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Binary Sensor
ha_release: 0.31
---

The `netatmo` binary sensor platform is consuming the information provided by a
[Netatmo](https://www.netatmo.com) camera.
This component allows you to get the latest event seen by the camera.

### {% linkable_title Basic Configuration %}

To enable the Netatmo binary sensor, you have to set up
[netatmo](/components/netatmo/),
this will use discovery to add your binary sensor.

### {% linkable_title Advanced configuration %}

If you want to select a specific sensor,
set discovery to `false` for [netatmo](/components/netatmo/)
and add the following lines to your `configuration.yaml`:

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

{% configuration %}
home:
  description: Will use the cameras of this home only.
  required: false
  type: string
timeout:
  description: >
    The Welcome/Presence binary sensors will
    stay on for X seconds after detection.
  required: false
  type: integer
  default: 90
cameras:
  description: List of cameras entity IDs to display.
  required: false
  type: list
welcome_sensors:
  description: >
    List of monitored conditions. Possible values are
    'Someone known', 'Someone unknown' and 'Motion'.
  required: false
  type: list
presence_sensors:
  description: >
    List of monitored conditions. Possible values are 'Outdoor motion',
    'Outdoor human', 'Outdoor animal' and 'Outdoor vehicle'.
  required: false
  type: list
{% endconfiguration %}

If **home** and **cameras** is not provided, all cameras will be used.
If multiple cameras are available then each monitored conditions
will create a specific sensor for each camera
