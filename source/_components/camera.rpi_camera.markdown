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
ha_release: 0.17
---


The `rpi_camera` platform allows you to integrate the Raspberry Pi camera into Home Assistant. This component uses the application [`raspistill`](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md) to store the image from camera.

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: rpi_camera
```

Configuration variables:

 - **name** (*Optional*): Name of the camera
 - **image_width** (*Optional*): Set the image width (default: 640)
 - **image_height** (*Optional*): Set the image height (default: 480)
 - **image_quality** (*Optional*): Set the image quality (from 0 to 100, default: 7)
 - **image_rotation** (*Optional*): Set image rotation (0-359, default: 0)
 - **horizontal_flip** (*Optional*): Set horizontal flip (0 to disable, 1 to enable, default: 0)
 - **vertical_flip** (*Optional*): Set vertical flip (0 to disable, 1 to enable, default: 0)
 - **timelapse** (*Optional*): Takes a picture every ms (default: 1000)
 - **file_path** (*Optional*): Save the picture in a custom file path (default: camera components folder)
 
The given **file_path** must be an existing file because the camera platform setup make a writeable check on it.

