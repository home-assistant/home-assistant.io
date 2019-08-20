---
title: "Vivotek Camera"
description: "Instructions on how to integrate Vivotek cameras within Home Assistant."
ha_category:
  - Camera
logo: vivotek.jpg
ha_release: 0.97
ha_iot_class: Configurable
redirect_from:
 - /components/camera.vivotek/
---

The `vivotek` camera platform allows you to integrate a Vivotek IP camera into Home Assistant.

Home Assistant will serve the images via its server, making it possible to view your IP cameras while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

## Configuration

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: vivotek
    name: Front door camera
    ip_address: 192.168.1.2
```

{% configuration %}
ip_address:
  description: "The IP address of your camera , e.g., `192.168.1.2`."
  required: true
  type: string
stream_source:
  description: "Enables the camera stream when set to `true`."
  required: false
  type: boolean
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
  description: "Type for authenticating the requests `basic` or `digest`."
  required: false
  default: basic
  type: string
limit_refetch_to_url_change:
  description: Limits re-fetching of the remote image to when the URL changes. Only relevant if using a template to fetch the remote image.
  required: false
  default: false
  type: boolean
content_type:
  description: Set the content type for the IP camera if it is not a jpg file. Use `image/svg+xml` to add a dynamic SVG file.
  required: false
  default: image/jpeg
  type: string
framerate:
  description: The number of frames-per-second (FPS) of the stream. Can cause heavy traffic on the network and/or heavy load on the camera.
  required: false
  type: integer
verify_ssl:
  description: Enable or disable SSL certificate verification. Set to false to use an http-only camera, or you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
  required: false
  default: true
  type: boolean
{% endconfiguration %}
