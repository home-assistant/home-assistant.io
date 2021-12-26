---
title: UniFi Protect
description: Instructions on how to configure UniFi Protect integration by Ubiquiti.
ha_category:
  - Hub
  - Camera
ha_release: 2022.2
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@briis'
  - '@AngellusMortis'
  - '@bdraco'
ha_domain: unifiprotect
ha_platforms:
  - camera
---

The UniFi Protect integration, adds support for retrieving Camera feeds and Sensor data from an [UniFi Protect application](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/) that is running on an UniFi OS Console.

## Prerequisites

### Hardware Support

This Integration supports all UniFi OS Consoles that can run UniFi Protect. Currently this includes:

* UniFi Protect Network Video Recorder (**UNVR**)
* UniFi Protect Network Video Recorder Pro (**UNVRPRO**)
* UniFi Dream Machine Pro (**UDMP**)
* UniFi Cloud Key Gen2 Plus (**CKGP**) firmware version v2.0.24+

CKGP with Firmware v1.x **do NOT run UniFiOS**, you must upgrade to firmware v2.0.24 or newer.

### Software Support

The absolute **minimal** software version is `1.20.0` for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported. Since UniFi Protect has its own release cycle, you should only upgrade UniFi Protect _after_ the next Home Assistant release comes out to ensure the new version is fully supported.

Example: as of `2022.2.0` of Home Assistant, UniFi Protect `1.21.0-beta.1` is the newest UniFi Protect version. So the recommended versions of UniFi Protect to run for a `2022.2.0` version of Home Assistant are `1.20.0`, `1.20.1` or `1.21.0-beta.1`.

### Local User

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti Cloud Users will **not** work.

1. Login to your *Local Portal* on your UniFiOS device, and click on *Users*
1. In the upper right corner, click on *Add User*
1. Click *Add Admin*, and fill out the form. Specific Fields to pay attention to:
    * Role: Must be *Limited Admin*
    * Account Type: *Local Access Only*
    * CONTROLLER PERMISSIONS - Under UniFi Protect, select Administrators. **NOTE**: Other roles may work, but only the default Administrators rule is fully tested.
1. Click *Add* in at the bottom Right.

**HINT**: A few users have reported that they had to restart their UDMP device after creating the local user for it to work. So if you get some kind of *Error 500* when setting up the Integration, try restart the UDMP.

![ADMIN_UNIFIOS](/images/integrations/unifiprotect/unifi_os_admin.png)

### Camera Streams

The Integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera to ensure you can stream your camera in Home Assistant. This may already be enabled by default, but it is recommended to just check that this is done. To check and enable the the feature

1. open UniFi Protect and click on *Devices*
1. Select *Manage* in the Menu bar at the top
1. Click on the + Sign next to RTSP
1. Enable minimum 1 stream out of the 3 available. The Stream with the Highest resolution as the default enabled one.

{% include integrations/config_flow.md %}

## Features

All known UniFi Protect devices are should be supported. Each UniFi Protect device will get a variety of entities added for each of the different entity platforms.

### Cameras

Each UniFi Protect camera will get the following entities added:

* **Camera** - A camera entity for each camera channel and RTSP(S) combination found for each camera (up to 6). Only the highest resolution RTSPS camera entity will be enabled by default.

## Troubleshooting

### Delay in Video Feed

The default settings on the stream integration, will give you a 5-15+ second delay. You can reduce this delay to 1-3 seconds, by enabling [LL-HLS in the stream integration](/integrations/stream/#ll-hls). You will also want to put an HTTP/2 reserve proxy in front of Home Assistant so you can have connection pooling. If you do not add a reverse proxy, you may start to get "Waiting for Websocket..." messages while trying to view too many camera streams at once. One way to do this is using the official NGINX Proxy Add-on:

[![NGINX Proxy Add-on](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_nginx_proxy)
