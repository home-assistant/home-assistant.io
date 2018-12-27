---
layout: page
title: "Generic MJPEG IP Camera"
description: "Instructions on how to integrate IP cameras within Home Assistant."
date: 2015-11-09 08:36
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Camera
ha_release: pre 0.7
ha_iot_class: "depends"
---

The `mjpeg` camera platform allows you to integrate IP cameras which are capable
to stream their video with MJPEG into Home Assistant.

## {% linkable_title Configuration %}

To enable this camera in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mjpeg
    mjpeg_url: http://192.168.1.92/mjpeg
```

{% configuration %}
mjpeg_url:
  description: The URL your camera serves the video on, eg. http://192.168.1.21:2112/
  required: true
  type: string
still_image_url:
  description: The URL for thumbnail picture if camera support that.
  required: false
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
username:
  description: The username for accessing your camera.
  required: false
  type: string
password:
  description: The password for accessing your camera.
  required: false
  type: string
authentication:
  description: "`basic` or `digest` auth for requests."
  required: false
  type: string
  default: basic
verify_ssl:
  description: Validate the ssl certificate for this camera.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## {% linkable_title Examples %}

Example of using a DCS-930L Wireless N Network Camera from D-Link:

```yaml
camera:
  - platform: mjpeg
    name: Livingroom Camera
    still_image_url: http://IP/image.jpg
    mjpeg_url: http://IP/video/mjpg.cgi
```

Example of integrating Blue Iris Cameras from a Blue Iris server.

```yaml
camera:
  - platform: mjpeg
    name: Livingroom Camera
    mjpeg_url: http://IP:PORT/mjpg/CAMERASHORTNAME/video.mjpeg
    username: BLUE_IRIS_USERNAME
    password: BLUE_IRIS_PASSWORD
    authentication: basic
```
