---
layout: page
title: "Raspberry Pi Camera"
description: "Instructions on how to integrate Raspberry Pi within Home Assistant."
date: 2016-04-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Camera
ha_iot_class: "Local Polling"
ha_release: 0.17
---


The `rpi_camera` platform allows you to integrate the Raspberry Pi camera into Home Assistant. This component uses the application [`raspistill`](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md) to store the image from camera.

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: rpi_camera
```

{% configuration %}
image_width:
  description: Set the image width.
  required: false
  default: 640
  type: int
name:
  description: Name of the camera.
  required: false
  default: Raspberry Pi Camera
  type: string
image_height:
  description: Set the image height.
  required: false
  default: 480
  type: int
image_quality:
  description: Set the image quality (from 0 to 100).
  required: false
  default: 7
  type: int
image_rotation:
  description: Set image rotation (0-359).
  required: false
  default: 0
  type: int
horizontal_flip:
  description: Set horizontal flip (0 to disable, 1 to enable).
  required: false
  default: 0
  type: int
vertical_flip:
  description: Set vertical flip (0 to disable, 1 to enable).
  required: false
  default: 0
  type: int
timelapse:
  description: Takes a picture every this many milliseconds (thousands of a second) - the default means one picture a second.
  required: false
  default: 1000
  type: int
file_path:
  description: Save the picture in a custom file path.
  required: false
  default: A temporary file is used.
  type: string
{% endconfiguration %}
 
The given **file_path** must be an existing file because the camera platform setup performs a writeable check on it. Also, keep in mind that the path should be [whitelisted](/docs/configuration/basic/).

