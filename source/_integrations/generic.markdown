---
title: Generic
description: Instructions on how to integrate IP cameras within Home Assistant.
ha_category:
  - Camera
logo: home-assistant.png
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: generic
ha_platforms:
  - camera
---

The `generic` camera platform allows you to integrate any IP camera or other URL into Home Assistant. Templates can be used to generate the URLs on the fly.

Home Assistant will serve the images via its server, making it possible to view your IP cameras while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

## Configuration

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: generic
    still_image_url: http://194.218.96.92/jpg/image.jpg
```

{% configuration %}
still_image_url:
  description: "The URL your camera serves the image on, e.g., `http://192.168.1.21:2112/`. Can be a [template](/topics/templating/)."
  required: true
  type: string
stream_source:
  description: "The URL your camera serves the live stream on, e.g., `rtsp://192.168.1.21:554/`. Can be a [template](/topics/templating/)."
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
rtsp_transport:
  description: "Set the RTSP transport protocol to `tcp`, `udp`, `udp_multicast` or `http`."
  required: false
  type: string
{% endconfiguration %}

<p class='img'>
  <a href='/examples/google_maps_card/'>
    <img src='/images/integrations/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
    Example showing the Generic camera platform pointing at a dynamic Google Map image.
  </a>
</p>

## Examples

In this section, you find some real-life examples of how to use this camera platform.

### Weather graph from yr.no

```yaml
camera:
  - platform: generic
    name: Weather
    still_image_url: https://www.yr.no/place/Norway/Oslo/Oslo/Oslo/meteogram.svg
    content_type: "image/svg+xml"
```

### Local image

You can show a static image with this platform. Just place the image here: `/config/www/your_image.png`

```yaml
camera:
  - platform: generic
    name: Some Image
    still_image_url: https://127.0.0.1:8123/local/your_image.png
    verify_ssl: false
```

### Sharing a camera feed from one Home Assistant instance to another

If you are running more than one Home Assistant instance (let's call them the 'host' and 'receiver' instances) you may wish to display the camera feed from the host instance on the receiver instance. You can use the [REST API](https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id) to access the camera feed on the host (IP address 127.0.0.5) and display it on the receiver instance by configuring the receiver with the following:

```yaml
camera:
  - platform: generic
    name: Host instance camera feed
    still_image_url: https://127.0.0.5:8123/api/camera_proxy/camera.live_view
```
### Image from HTTP only camera

To access a camera which is only available via HTTP, you must turn off SSL verification.

```yaml
camera:
  - platform: generic
    name: Some Image
    still_image_url: http://example.org/your_image.png
    verify_ssl: false
```

### Live stream

To access a camera that has both a snapshot and live stream URL, utilizing the [stream](/integrations/stream/) component.

```yaml
camera:
  - platform: generic
    name: Streaming Enabled
    still_image_url: http://194.218.96.92/jpg/image.jpg
    stream_source: rtsp://194.218.96.92:554
```

### Secured access to the camera

To access a camera that requires secured access for still image or live stream (an HIK in my case).

```yaml
camera: 
  - platform: generic
    still_image_url: "http://192.168.1.100/ISAPI/Streaming/Channels/101/picture"
    stream_source: "rtsp://USERNAME:PASSWORD@192.168.1.100:554/Streaming/Channels/102"
    name: "My Camera"
    verify_ssl: false
    username: "USERNAME"
    password: "PASSWORD"
    authentication: digest
```
