---
title: VIVOTEK
description: Instructions on how to integrate VIVOTEK cameras within Home Assistant.
ha_category:
  - Camera
ha_release: 0.99
ha_iot_class: Local Polling
ha_codeowners:
  - '@HarlemSquirrel'
ha_domain: vivotek
ha_platforms:
  - camera
ha_integration_type: device
ha_config_flow: true
---

The **VIVOTEK** {% term integration %} allows you to integrate a VIVOTEK IP camera into Home Assistant.

Home Assistant will serve the images via its server, making it possible to view your IP cameras while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
ip_address:
  description: The IP address of your camera, e.g., `192.168.1.2`.
port:
  description: The port number.
name:
  description: The name of your camera.
username:
  description: The username for accessing your camera.
password:
  description: The password for accessing your camera.
authentication:
  description: "Type for authenticating the requests with `basic` or `digest`."
security_level:
  description: The security level of the user accessing your camera. This could be `admin` or `viewer`.
ssl:
  description: Enable or disable SSL. Set to false to use an HTTP-only camera.
verify_ssl:
  description: Enable or disable SSL certificate verification. Set to false to use an HTTP-only camera, or you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
framerate:
  description: The number of frames-per-second (FPS) of the stream. Can cause heavy traffic on the network and/or heavy load on the camera.
stream_path:
  description: This parameter allows you to override the stream path. The default is `live.sdp`.
{% endconfiguration_basic %}

{% include integrations/actions.md %}
