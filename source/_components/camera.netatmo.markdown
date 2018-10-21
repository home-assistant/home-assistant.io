---
layout: page
title: "Netatmo Camera"
description: "Instructions on how to integrate Netatmo cameras into Home Assistant."
date: 2016-06-02 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Camera
ha_release: 0.22
ha_iot_class: "Local Polling"
---

The `netatmo` camera platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) camera. This component allows you to view the current photo created by the Camera.

### {% linkable_title Basic configuration %}

To enable the Netatmo camera, you have to set up [netatmo](/components/netatmo/), this will use discovery to add your camera.

### {% linkable_title Advanced configuration %}

If you want to select a specific camera, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
camera:
  - platform: netatmo
```

{% configuration %}
home:
  description: Will display the cameras of this home only.
  required: false
  type: string
cameras:
  description: Cameras to use. Multiple entities allowed.
  required: false
  type: list
  keys:
    camera_name:
      description: Name of the camera to display.
{% endconfiguration %}

If **home** and **cameras** are not provided, all cameras will be displayed. For more control over your cameras check the configuration sample below.

```yaml
# Example configuration.yaml entry
camera:
  platform: netatmo
  home: home_name
  cameras:
    - camera_name1
    - camera_name2
```
