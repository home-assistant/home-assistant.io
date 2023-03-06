---
title: Reolink IP NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
  - Update
ha_iot_class: Local Push
ha_release: 2023.1
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - camera
  - number
  - update
ha_integration_type: integration
ha_dhcp: true
---

The integration allows you to control [Reolink](https://reolink.com/) NVRs or cameras.

{% include integrations/config_flow.md %}

A Reolink user account with admin privileges is needed for the proper operation of this integration.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Protocol:
  description: Switch between RTSP, RTMP or FLV streaming protocol.
{% endconfiguration_basic %}

## Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions: Main, Sub, Ext, and Snapshots.
The Sub stream camera entity is enabled by default; the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate; this can be used when the RTMP/RTSP/FLV video stream has too much lag.

## Binary sensors

Depending on the supported features of the camera binary sensors are added for:

- Motion detection
- Doorbell presses
- AI person detection
- AI vehicle detection
- AI pet detection
- AI face detection

These sensors are polled every 60 seconds and receive ONVIF push events for immediate updates.
Not all camera models generate ONVIF push events for all event types, some binary sensors might, therefore, only be polled.

## Number entities

Depending on the supported features of the camera number entities are added for:

- Optical zoom control
- Focus control

## Update entity

An update entity is available that checks for firmware updates every 12 hours.
This does the same as pressing the "Check for latest version" in the Reolink applications.
Unfortunately this does not always shows the latest available firmware (also not in the Reolink applications).
The latest firmware can be downloaded from the [Reolink download center](https://reolink.com/download-center/) and uploaded to the camera/NVR manually.

## Tested models

The following models have been tested and confirmed to work:

- C1 Pro
- C2 Pro
- E1 Zoom
- E1 Outdoor
- RLC-410
- RLC-410W
- RLC-411
- RLC-420
- RLC-510A
- RLC-511
- RLC-511W
- RLC-520
- RLC-520A
- RLC-522
- RLC-810A
- RLC-811A
- RLC-820A
- RLC-823A
- RLN8-410 NVR
- RLN16-410 NVR
- Reolink Duo Floodlight PoE
- Reolink TrackMix PoE
- Reolink Video Doorbell (PoE and Wi-Fi)

Battery-powered cameras are not yet supported.

The following models are lacking the HTTP webserver API and can therfore not work with this integration:

- E1 Pro
- E1

## Troubleshooting

- Older firmware versions do not expose the necessary information the integration needs to function. Ensure the camera is updated to the [latest firmware](https://reolink.com/download-center/) prior to setting up the integration. Note that Reolink auto update and check for update functions in the app/windows/web client often do not show the latest available firmware version. Therefore check the version in the [Reolink download center](https://reolink.com/download-center/) online.
- Ensure at least one of the HTTP/HTTPS ports is enabled in the [windows](https://reolink.com/software-and-manual/)/web client under `Settings`->`Network`->`Advanced`->`Port Settings`, see [additional instructions](https://support.reolink.com/hc/en-us/articles/900004435763-How-to-Set-up-Reolink-Ports-Settings-via-Reolink-Client-New-Client-) on the Reolink site.

## Reolink firmware limitations

- The Reolink NVR only sends event-notifications if motion happens on the camera connected to the first (index "0") channel, therefore the binary sensors of all channels will only be updated when the first channel sees motion. Beta NVR firmware v3.0.0.211_23011204 fixes this issue, you can request beta firmware from reolink support, release firmware is expected in a few weeks.
- Reolink doorbell presses only generate ONVIF event notifications when the doorbell is directly connected to your network. The doorbell visitor binary sensor will not work when connecting the Reolink doorbell to an NVR. Beta NVR firmware v3.0.0.211_23011204 fixes this issue, you can request beta firmware from reolink support, release firmware is expected in a few weeks.
