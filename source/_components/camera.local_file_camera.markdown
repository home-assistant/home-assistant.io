---
layout: page
title: "Local File Camera"
description: "Instructions how to Local File Camera within Home Assistant."
date: 2016-05-16 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Camera
ha_iot_class: "Local Polling"
ha_release: 0.20
---

The `Local File Camera` allows you to integrate any readable image file from disk into Home Assistant.
If the image is updated in the file system the image displayed in Home Assistant will also be updated.
This can for example be used with various camera platforms that save a temporary images localy.

```yaml
# Example configuration.yaml entry
camera:
  platform: local_file_camera
  name: Local File Camera
  file_path: /tmp/image.jpg
```

Configuration variables:

 - **name** (optional): Name of the camera
 - **file_path** (required): File to serve as the camera.
 
The given **file_path** must be an existing file because the camera platform setup make a readable check on it.
