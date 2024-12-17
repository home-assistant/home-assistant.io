---
title: Raspberry Pi Camera
description: Instructions on how to integrate Raspberry Pi within Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_release: 0.17
ha_domain: rpi_camera
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rpi_camera` {% term integration %} allows you to integrate the Raspberry Pi camera into Home Assistant. This integration uses the application [`raspistill`](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md) to store the image from camera.

{% important %}
This integration is only available on Home Assistant Core installation types. Unfortunately, it cannot be used with Home Assistant OS, Supervised or Container.
{% endimportant %}

## Configuration

To enable this camera in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
rpi_camera:
```

The whole set of configuration variables is documented here [`Raspberry Pi Camera Module - Raspberry Pi Documentation`](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md).
They are not all wrapped by this `rpi_camera` platform.

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
overlay_metadata:
  description: Adds some text and/or metadata onto the picture. Check the [`--annotate`](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md) section.
  required: false
  type: integer
  default: none
overlay_timestamp:
  description: Helper to add date/time onto the picture. Format as used by [`strftime`](https://man7.org/linux/man-pages/man3/strftime.3.html).
  required: false
  type: string
  default: none
file_path:
  description: Save the picture in a custom file path.
  required: false
  type: string
  default: A temporary file is used.
{% endconfiguration %}

The given **file_path** must be an existing file because the camera platform setup performs a writeable check on it. Also, keep in mind that the path should be [whitelisted](/integrations/homeassistant/#allowlist_external_dirs).
