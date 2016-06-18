---
layout: page
title: "Generic IP Camera"
description: "Instructions how to integrate IP cameras within Home Assistant."
date: 2015-07-11 0:36
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: camcorder.png
ha_release: pre 0.7
---


The `generic` camera platform allows you to integrate any IP camera into Home Assistant. It supports fetching images from a url with optional HTTP authentication.

Home Assistant will serve the images via its server, making it possible to view your IP camera's while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]?time=[timestamp]`.

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: generic
  still_image_url: http://194.218.96.92/jpg/image.jpg
  name: my sample camera
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **still_image_url** (*Required*): The URL your camera serves the image on, eg. http://192.168.1.21:2112/
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **username** (*Optional*): The username for accessing your camera.
- **password** (*Optional*): The password for accessing your camera.
