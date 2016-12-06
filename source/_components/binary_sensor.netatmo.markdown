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

The `netatmo` binary sensor platform is consuming the information provided by a [Netatmo Welcome](https://www.netatmo.com) camera. This component allows you to get the latest event seen by the camera.

To enable the Netatmo binary sensor, you have to set up [netatmo](/components/netatmo/), this will use discovery to add your binary sensor.

### {% linkable_title Advanced configuration %}

If you want to select a specific sensor, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: netatmo
  home: home_name
  timeout: 15
  cameras:
    - camera_name1
  monitored_conditions:
    - Someone known
    - Someone unknown 
    - Motion
```

Configuration variables:

- **home** (*Optional*): Will use the cameras of this home only.
- **timeout** (*Optional*): The binary sensors will reflect the events from the last X minutes (default: 15)
- **cameras** array (*Optional*): Cameras to use. Multiple entities allowed.
    - 'camera_name': Name of the camera to display.
- **monitored_conditions** array (*Optional*): List of monitored conditions.
    - 'Someone known'
    - 'Someone unknown'
    - 'Motion'

If **home** and **cameras** is not provided, all cameras will be used. If multiple cameras are available then each monitored conditions will create a specific sensor for each camera

<p class='note'>
[Welcome tags](https://www.netatmo.com/product/security/welcome/tags) are not yet supported, but will be in a next update.
</p>
