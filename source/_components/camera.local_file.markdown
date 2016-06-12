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

The `Local File ` allows you to integrate any readable image file from disk into Home Assistant as a Camera.
If the image is updated in the file system the image displayed in Home Assistant will also be updated.
This can for example be used with various camera platforms that save a temporary images localy.

```yaml
# Example configuration.yaml entry
camera:
  platform: local_file
  name: Local File
  file_path: /tmp/image.jpg
```

Configuration variables:

 - **name** (optional): Name of the camera
 - **file_path** (required): File to serve as the camera.
 
The given **file_path** must be an existing file because the camera platform setup make a readable check on it.
