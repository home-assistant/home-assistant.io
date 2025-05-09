---
title: Generic Camera
description: Instructions on how to integrate IP cameras within Home Assistant.
ha_category:
  - Camera
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: generic
ha_platforms:
  - camera
  - diagnostics
ha_codeowners:
  - '@davet2001'
ha_config_flow: true
ha_integration_type: device
---

The `generic` camera platform allows you to integrate any IP camera or other URL into Home Assistant. Templates can be used to generate the URLs on the fly.

Home Assistant will serve the images via its server, making it possible to view your IP cameras while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

{% include integrations/config_flow.md %}

You must enter a URL in at least one of the fields **Still Image URL** or **Stream Source URL**, the others are optional.

[Templates](/docs/configuration/templating/) are allowed in the URL fields, which can be used to select different images or parameterize the URL depending on the status of sensors.  Template validity and network access are checked during the configuration steps.

{% configuration_basic %}
Still Image URL:
  description: "The URL your camera serves the image on, e.g., `http://192.168.1.21:2112/`. Can be a [template](/docs/configuration/templating/). Usernames and passwords are allowed in the URL, but if none are provided, the `Username` and `Password` settings will be used during authentication.  At least one of still_image_url or stream_source must be provided."
Stream Source:
  description: "The URL your camera serves the live stream on, e.g., `rtsp://192.168.1.21:554/`. Can be a [template](/docs/configuration/templating/). Usernames and passwords are allowed in the URL, but if none are provided, the `Username` and `Password` settings will be used during authentication.  At least one of still_image_url or stream_source must be provided. Note that a stream_source without a still_image_url can only be used if the [stream integration](/integrations/stream/) is configured."
Username:
  description: The username for accessing your camera. Note that this applies to both still_image_url and stream_source.
Password:
  description: The password for accessing your camera. Note that this applies to both still_image_url and stream_source.
Authentication:
  description: "Type for authenticating the requests `basic` or `digest`."
Limit refetch to URL change:
  description: Limits re-fetching of the remote image to when the URL changes. Only relevant if using a template to fetch the remote image.
Frame Rate:
  description: The number of frames-per-second (FPS) of the stream. Can cause heavy traffic on the network and/or heavy load on the camera.
Verify SSL certificate:
  description: Enable or disable SSL certificate verification. Set to false to use an http-only camera, or you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
RTSP transport protocol:
  description: "Set the RTSP transport protocol to `tcp`, `udp`, `udp_multicast` or `http`."
Use wallclock as timestamps:
  description: ([Advanced Mode](/blog/2019/07/17/release-96/#advanced-mode) only) Rewrite the camera timestamps. This may help with playback or crashing issues from Wi-Fi cameras or cameras of certain brands (e.g., EZVIZ).
{% endconfiguration_basic %}

<p class='img'>
  <a href='/examples/google_maps_card/'>
    <img src='/images/integrations/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
    Example showing the Generic camera platform pointing at a dynamic Google Map image.
  </a>
</p>

## Examples

In this section, you find some real-life examples of how to use this camera platform.

### Weather graph from USA National Weather Service

You can display a GIF from the web as a still image.

- Still Image URL: `https://radar.weather.gov/ridge/standard/CONUS_0.gif`

### Local image

You can show a static image with this platform. Just place the image here: `/config/www/your_image.png`

- Still Image URL: `https://127.0.0.1:8123/local/your_image.png`

### Sharing a camera feed from one Home Assistant instance to another

If you are running more than one Home Assistant instance (let's call them the 'host' and 'receiver' instances) you may wish to display the camera feed from the host instance on the receiver instance. You can use the [REST API](https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id) to access the camera feed on the host (IP address 127.0.0.5) and display it on the receiver instance by configuring the receiver with the following:

- Still Image URL: `https://127.0.0.5:8123/api/camera_proxy/camera.live_view`

### Image from HTTP only camera

To access a camera which is only available via HTTP, you must turn off SSL verification.

- Still Image URL: `http://example.org/your_image.png`

### Live stream

To access a camera that has both a snapshot and live stream URL, utilizing the [stream](/integrations/stream/) integration.

- Still Image URL: `http://194.218.96.92/jpg/image.jpg`
- Stream Source: `rtsp://user:pass@194.218.96.92:554`

If a camera only has a live stream URL and no snapshot URL, the [stream](/integrations/stream/) integration can also generate still images from the live stream URL.

- Stream Source: `rtsp://user:pass@194.218.96.92:554`

### Secured access to the camera

To access a camera that requires secured access for still image or live stream (an HIK in my case).

- Still Image URL: `http://192.168.1.100/ISAPI/Streaming/Channels/101/picture`
- Stream Source: `rtsp://USERNAME:PASSWORD@192.168.1.100:554/Streaming/Channels/102`
- Verify SSL: `false`
- Username: `user`
- Password: `pass`
- Authentication: `digest`
