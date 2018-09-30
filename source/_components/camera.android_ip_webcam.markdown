---
layout: page
title: "Android IP Webcam Camera"
description: "Instructions on how to integrate Android IP Webcam cameras within Home Assistant."
date: 2015-07-11 0:36
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: android_ip_webcam.png
ha_release: "0.40"
ha_iot_class: "Local Polling"
---


The `android_ip_webcam` component adds a camera by default if you choose not to use the component but still want to see the video feed then the [`mjpeg` camera](/components/camera.mjpeg/) platform can be used.

To enable only the camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mjpeg
    mjpeg_url: http://IP_ADDRESS:8080/video
```

