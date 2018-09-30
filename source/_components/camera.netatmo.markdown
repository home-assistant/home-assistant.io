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

### {% linkable_title Basic Configuration %}

The `netatmo` camera platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) camera. This component allows you to view the current photo created by the Camera.

To enable the Netatmo camera, you have to set up [netatmo](/components/netatmo/), this will use discovery to add your camera.

### {% linkable_title Advanced configuration %}

If you want to select a specific camera, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
camera:
  - platform: netatmo
```

Configuration variables:

- **home** (*Optional*): Will display the cameras of this home only.
- **cameras** array (*Optional*): Cameras to use. Multiple entities allowed.
    - **camera_name**: Name of the camera to display.

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
