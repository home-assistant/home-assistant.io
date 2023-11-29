---
title: MJPEG IP Camera
description: Instructions on how to integrate IP cameras within Home Assistant.
ha_category:
  - Camera
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: mjpeg
ha_config_flow: true
ha_platforms:
  - camera
ha_integration_type: integration
---

The MJPEG IP Camera integration allows you to integrate IP cameras which are
capable to stream their video with MJPEG (Motion JPEG) into Home Assistant.

## Prerequisites

To use this integration, you will need to at least have the video streaming
URL for your camera. If you don't know it, you could try to look it up
in the [iSpy Camera Connection Database](https://www.ispyconnect.com/cameras).

{% include integrations/config_flow.md %}

{% configuration_basic %}
MJPEG URL:
  description: The URL your camera serves the video on, e.g., `http://192.168.1.21:2112/`
Still Image URL:
  description: The URL for thumbnail picture (if the camera support that).
Username:
  description: The username for accessing your camera.
Password:
  description: The password for accessing your camera.
Verify SSL:
  description: Validate the SSL certificate for this camera.
{% endconfiguration_basic %}

This integration support both basic and digest authentication, which one to
use is automatically detected when using a username and password.

## Examples of MJPEG and still image URLs

- Blue Iris Cameras / Blue Iris Server:
  - MJPEG URL: `http://IP:PORT/mjpg/CAMERASHORTNAME/video.mjpeg`
  - Still Image URL: `http://IP:PORT/image/CAMERASHORTNAME`

- DCS-930L Wireless N Network Camera from D-Link:
  - MJPEG URL: `http://IP/video/mjpg.cgi`
  - Still Image URL: `http://IP/image.jpg`

- DCS-933L Wireless N Network Camera from D-Link:
  - MJPEG URL: `http://IP:PORT/video/mjpg.cgi`
  - Still Image URL: `http://IP:PORT/image/jpeg.cgi`

- OctoPrint (OctoPi):
  - MJPEG URL: `http://IP/webcam/?action=stream`
  - Still Image URL: `http://IP/webcam/?action=snapshot`

- Legacy Foscam / wanscam
  - MJPEG URL: `http://IP:PORT/videostream.cgi` (add ?resultion=32 for 640x480 or ?resultion=32 for 320x240)
  - Still Image URL: `http://IP:PORT/snapshot.cgi`
