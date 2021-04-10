---
title: Ezviz
description: Integrate Ezviz camera within Home Assistant.
ha_release: 0.107
ha_category:
  - Camera
ha_iot_class: Cloud Polling
ha_domain: ezviz
ha_codeowners:
  - '@baqs'
  - '@RenierM26'
ha_config_flow: true
ha_platforms:
  - camera
---

The `ezviz` sensor platform uses the EzvizLife API to interact with the devices.
It also exposes an RTSP stream, by using the local camera IPs (so the device hosting Home Assistant has to be able to access the local IP of the cameras).

As there is no official documentation for the API, the component retrieves data from the API used in the Ezviz mobile app, [hosted here](https://apiieu.ezvizlife.com).

The password for each camera is usually written near the QR code. This could be underneath the device or in the user manual. It is usually referred to as the camera "verification code".

{% include integrations/config_flow.md %}

Your cameras will now show under integration options as "discovered devices". Please complete the setup for each camera to see the video stream within Home Assistant.

You can also change the camera options should you need to access a high or low res stream. Generally, though it will just work without any modification to options.
