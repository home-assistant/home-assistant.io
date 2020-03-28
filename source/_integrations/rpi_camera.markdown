---
title: Raspberry Pi Camera
description: Instructions on how to integrate Raspberry Pi within Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_release: 0.17
ha_domain: rpi_camera
---

The `rpi_camera` platform allows you to integrate the Raspberry Pi camera into Home Assistant. This integration uses the application [`raspistill`](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md) to store the image from camera.

## Configuration

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
  type: integer
  default: 640
name:
  description: Name of the camera.
  required: false
  type: string
  default: Raspberry Pi Camera
image_height:
  description: Set the image height.
  required: false
  type: integer
  default: 480
image_quality:
  description: Set the image quality (from 0 to 100).
  required: false
  type: integer
  default: 7
image_rotation:
  description: Set image rotation (0-359).
  required: false
  type: integer
  default: 0
horizontal_flip:
  description: Set horizontal flip (0 to disable, 1 to enable).
  required: false
  type: integer
  default: 0
vertical_flip:
  description: Set vertical flip (0 to disable, 1 to enable).
  required: false
  type: integer
  default: 0
timelapse:
  description: Takes a picture every this many milliseconds (thousands of a second) - the default means one picture a second.
  required: false
  type: integer
  default: 1000
file_path:
  description: Save the picture in a custom file path.
  required: false
  type: string
  default: A temporary file is used.
{% endconfiguration %}

The given **file_path** must be an existing file because the camera platform setup performs a writeable check on it. Also, keep in mind that the path should be [whitelisted](/docs/configuration/basic/).
