---
title: Reolink NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 2022.12
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - Camera
ha_integration_type: integration
---

The integration allows you to control [Reolink](https://reolink.com/) NVRs or cameras.

{% include integrations/config_flow.md %}

## Known reolink firmware bugs

<div class='note warning'>
There is a BUG in Reolink NVR firmware: it only sends ONVIF event-notifications if motion happened on the camera connected to its very first (index "0") channel.
Reolink is aware of this and are working on fixing the problem.
</div>

<div class='note warning'>
Reolink doorbell presses only generate ONVIF event-notifications when the doorbell is directly connected to your network.
When connecting the Reolink doorbell to a NVR, no doorbell press events are generated.
Reolink is aware of this and a solution is already implemented in beta firmware.
</div>

## Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions: Main, Sub, Ext and Images.
The Sub stream camera entity is enabled by default, the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate, this can be used when the hi-res RTMP/RTSP video stream are too laggy.

## Configuration options

In the options menu, the following parameters can be configured:

| Parameter               | Description                                                                                                 |
| :-------------------    | :---------------------------------------------------------------------------------------------------------- |
| Protocol                | Switch between the RTMP or RTSP streaming protocol.                                                         |

## Unsupported models

The following models are not to be supported:

- Battery-powered cameras
- B800: Only with NVR
- B400: Only with NVR
- D400: Only with NVR
- Lumus

## Reducing latency and load time

To get considerebly lower lattency and faster loading, a add-on can be used to convert the RTSP stream to a WebRTC stream.
1) In the configuration options of this reolink integration, select 'RTSP' as stream protocol.
2) add https://github.com/allenporter/stream-addons to the [add-on repositories](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fallenporter%2Fstream-addons).
3) Install en start the 'RTSPtoWeb - WebRTC' add-on.
4) The [RTSPtoWebRTC integration](https://www.home-assistant.io/integrations/rtsp_to_webrtc/) should now be automatically discovered. Navigate to the integrations dashboard in Home Assistant and install this integration.
5) Check in the 'development tools' -> 'status' that the camera attribute 'frontend_stream_type' now shows 'web_rtc' for the reolink cameras.

