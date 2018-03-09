---
layout: page
title: "Camera Proxy"
description: "Instructions how to integrate a camera proxy within Home Assistant."
date: 2018-03-08 19:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
ha_release: 0.65
ha_iot_class: "depends"
---


The `proxy` camera platform allows you to pass another camera's output through post-processing routines and generate a new camera with the post-processed output.

The current post-processing supports resizing the image/MJPEG as well as limiting the maximum refresh rate.

The current proxy capabilities are intended to reduce the camera bandwidth for slower internet connections.

To enable this camera in your installation, you must first have an existing working camera configured in Home Assistant.  Next, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: proxy
    entity_id: camera.<existingcamera>
    max_stream_width: 360
    max_image_width: 720
```

Configuration variables:

- **entity_id** (*Required*): The ID of another Home Assistant camera to post-process.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **max_image_width** (*Optional*): The maximum width of single images taken from the camera (aspect ratio will be maintained).
- **max_stream_width** (*Optional*): The maximum width of the MJPEG stream from the camera (aspect ratio will be maintained).
- **image_quality** (*Optional*): The quality level used for resulting JPEG for snapshots (default: 75).
- **stream_quality** (*Optional*): The quality level used for resulting MJPEG streams (default: 75).
- **image_refresh_rate** (*Optional*): The minimum time in seconds between generating successive image snapshots.
- **force_resize** (*Optional*): Resize the image even if the resulting image would take up more bandwidth than the original.
- **cache_images** (*Optional*): Preserve the last image and re-send in the case the camera is not responding.


## {% linkable_title Examples %}

Example of using a Camera proxy along with a Foscam camera:

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
```
