---
layout: page
title: "Local File"
description: "Instructions how to use Local File as a Camera within Home Assistant."
date: 2016-06-12 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Camera
ha_iot_class: "Local Polling"
ha_release: 0.22
---

The `local_file` camera platform allows you to integrate an image file from disk into Home Assistant as a camera. If the image is updated on the file system the image displayed in Home Assistant will also be updated. The service `local_file_update_file_path` can be used to update the image using an automation.

The `local_file` camera can for example be used with various camera platforms that save a temporary images locally. It can also be used to display a graph that you render periodically and will then be displayed in Home Assistant.

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: local_file
    file_path: /tmp/image.jpg
```

Configuration variables:

 - **file_path** (*Required*): File to serve as the camera.
 - **name** (*Optional*): Name of the camera

### {% linkable_title Service `camera.local_file_update_file_path` %}

Use this service to change the file displayed by the camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera to update.
| `file_path` | The full path to the new image file to be displayed.
