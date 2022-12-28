---
title: Reolink NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 2023.1
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

## Reolink firmware limitations

<div class='note warning'>
The Reolink NVR only sends ONVIF event-notifications if motion happens on the camera connected to the first (index "0") channel.
</div>

<div class='note warning'>
Reolink doorbell presses only generate ONVIF event notifications when the doorbell is directly connected to your network. No doorbell press events are generated when connecting the Reolink doorbell to an NVR.
</div>

## Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions: Main, Sub, Ext, and Images.
The Sub stream camera entity is enabled by default; the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate; this can be used when the hi-res RTMP/RTSP video stream has too much lag.

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

