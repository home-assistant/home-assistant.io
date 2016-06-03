---
layout: page
title: "Netatmo Camera"
description: "Instructions how to integrate Netatmo camera into Home Assistant."
date: 2016-06-02 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Camera
---


The `netatmo` camera platform is consuming the information provided by a [Netatmo Welcome](https://www.netatmo.com) camera. This component allows you to view the current photo created by the Camera.

To enable the Netatmo camera, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
camera:
  platform: netatmo
  home: home_name
  cameras:
    - camera_name1
    - camera_name2
```

Configuration variables:

- **home** (*Optionnal*): Will display the cameras of this home only.
- **cameras** array (*Optionnal*): Cameras to use. Multiple enties allowed.
    - **camera_name**: Name of the camera to display.

If **home** and **cameras** is not provided, all cameras will be displayed.

