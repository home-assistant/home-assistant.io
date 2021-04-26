---
title: MJPEG IP Camera
description: Instructions on how to integrate IP cameras within Home Assistant.
ha_category:
  - Camera
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: mjpeg
ha_platforms:
  - camera
---

The `mjpeg` camera platform allows you to integrate IP cameras which are capable
to stream their video with MJPEG into Home Assistant.

## Configuration

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
  description: The URL your camera serves the video on, e.g., `http://192.168.1.21:2112/`
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
  description: Validate the SSL certificate for this camera.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Examples

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

Example of using a DCS-930L Wireless N Network Camera from D-Link:

```yaml
camera:
  - platform: mjpeg
    name: "YOUR_FRIENDLY_NAME"
    still_image_url: "http://USER:PASSWORD@IP_CAM:PORT/image/jpeg.cgi"
    mjpeg_url: "http://USER:PASSWORD@IP_CAM:PORT/video/mjpg.cgi"
```
