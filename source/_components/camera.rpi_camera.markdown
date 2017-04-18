---
layout: page
title: "Raspberry Pi Camera"
description: "Instructions how to integrate Raspberry Pi within Home Assistant."
date: 2016-04-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Camera
ha_iot_class: "Local Polling"
---


The `rpi` platform allows you to integrate the Raspberry Pi camera into Home Assistant. This component uses the application "raspistill" to store the image from camera.

```yaml
# Example configuration.yaml entry
camera:
  platform: raspberry_camera
  name: Raspberry Pi Camera
  image_width: 640
  image_height: 480
  image_quality: 7
  image_rotation: 0
  timelapse: 1000
  horizontal_flip: 0
  vertical_flip: 0
  file_path: /tmp/image.jpg
```

Configuration variables:

 - **name** (optional): name of the camera
 - **image_width** (optional): set the image width (default: 640)
 - **image_height** (optional): set the image width (default: 480)
 - **image_quality** (optional): set the image quality (from 0 to 100, default: 7)
 - **image_rotation** (optional): Set image rotation (0-359, default: 0)
 - **horizontal_flip** (optional): Set horizontal flip (0 to disable, 1 to enable, default: 0)
 - **vertical_flip** (optional): Set vertical flip (0 to disable, 1 to enable, default: 0)
 - **timelapse** (optional): Takes a picture every <t>ms (default: 1000)
 - **file_path** (optional): Save the picture in a custom file path (default: camera components folder)
