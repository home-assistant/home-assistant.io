---
layout: component
title: "Generic MJPEG IP Camera"
description: "Instructions how to integrate IP cameras within Home Assistant."
date: 2015-11-09 08:36
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
---


The mjpeg component allows you to integrate IP cameras which are capable to  stream their video with MJPEG into Home Assistant.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: mjpeg
  mjpeg_url: http://194.218.96.92/jpg/image.jpg
  name: my sample camera
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **mjpeg_url** *Required*: The URL your camera serves the image on, eg. http://192.168.1.21:2112/
- **name** *Optional*: This parameter allows you to override the name of your camera.
- **username** *Optional*: The username for accessing your camera.
- **password** *Optional*: The password for accessing your camera.
