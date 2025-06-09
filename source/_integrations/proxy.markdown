---
title: Camera Proxy
description: Instructions on how to integrate a camera proxy within Home Assistant.
ha_category:
  - Camera
ha_release: 0.65
ha_domain: proxy
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `proxy` camera {% term integration %} allows you to pass another camera's output through post-processing routines and generate a new camera with the post-processed output.

The current post-processing supports resizing and/or cropping the image/MJPEG as well as limiting the maximum refresh rate.

The current proxy capabilities are intended to reduce the camera bandwidth for slower internet connections.

## Configuration

To enable this camera in your installation, you must first have an existing working camera configured in Home Assistant.  Next, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: proxy
    entity_id: camera.<existingcamera>
    max_stream_width: 360
    max_image_width: 720
```

{% configuration %}
entity_id:
  description: The ID of another Home Assistant camera to post-process.
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
mode:
  description: The operating mode, either `resize` or `crop`.
  required: false
  type: string
  default: resize
max_image_width:
  description: The maximum width of single images taken from the camera (aspect ratio will be maintained on resize processing).
  required: false
  type: integer
max_image_height:
  description: The maximum height of single images taken from the camera, only used for crop operations. If not provided, the original height is assumed by default.
  required: false
  type: integer
max_stream_width:
  description: The maximum width of the MJPEG stream from the camera (aspect ratio will be maintained on resize processing).
  required: false
  type: integer
max_stream_height:
  description: The maximum height of the MJPEG stream from the camera, only used for crop operations. If not provided, the original height is assumed by default.
  required: false
  type: integer
image_top:
  description: The top (y) coordinate to be used as a starting point for crop operations.
  required: false
  type: integer
  default: 0
image_left:
  description: The left (x) coordinate to be used as a starting point for crop operations.
  required: false
  type: integer
  default: 0
image_quality:
  description: The quality level used for resulting JPEG for snapshots.
  required: false
  type: integer
  default: 75
stream_quality:
  description: The quality level used for resulting MJPEG streams.
  required: false
  type: integer
  default: 75
image_refresh_rate:
  description: The minimum time in seconds between generating successive image snapshots.
  required: false
  type: float
force_resize:
  description: Resize the image even if the resulting image would take up more bandwidth than the original.
  required: false
  type: boolean
  default: false
cache_images:
  description: Preserve the last image and re-send in the case the camera is not responding.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Examples

Example of using two Camera proxies along with a Foscam camera:

```yaml
camera:
  - platform: foscam
    ip: 192.168.1.10
    username: foscam_camera
    password: camera_password
    name: mycamera
  - platform: proxy
    entity_id: camera.mycamera
    max_stream_width: 360
    max_image_width: 480
    image_refresh_rate: 5.0
  - platform: proxy
    entity_id: camera.mycamera
    name: My cropped camera
    mode: crop
    max_image_width: 480
    max_image_height: 320
    max_stream_width: 480
    max_stream_height: 320
    image_left: 100
```
