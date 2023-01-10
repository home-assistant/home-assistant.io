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

{% include integrations/option_flow.md %}
{% configuration_basic %}
Protocol:
  description: Switch between RTSP, RTMP or FLV streaming protocol. 
{% endconfiguration_basic %}

## Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions: Main, Sub, Ext, and Images.
The Sub stream camera entity is enabled by default; the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate; this can be used when the RTMP/RTSP/FLV video stream has too much lag.

## Binary sensors

Depending on the supported features of the camera binary sensors are added for:

- motion detection
- doorbell presses
- AI person detection
- AI vehicle detection
- AI pet detection
- AI face detection

These sensors are polled every 60 seconds and receive ONVIF push events for immediate updates.
Not all camera models generate ONVIF push events for all event types, some binary sensors might therefore only be polled.

## Tested models

The following models have been tested and confirmed to work:

- RLN8-410 NVR
- RLC-811A
- RLC-420-5MP
- Reolink Video Doorbell PoE
- Reolink Video Doorbell WiFi

Battery-powered cameras are not yet supported.

## Reolink firmware limitations

- The Reolink NVR only sends event-notifications if motion happens on the camera connected to the first (index "0") channel, therefore the binary sensors of all channels will only be updated when the first channel sees motion.
- Reolink doorbell presses only generate ONVIF event notifications when the doorbell is directly connected to your network. The doorbell visitor binary sensor will not work when connecting the Reolink doorbell to an NVR.
