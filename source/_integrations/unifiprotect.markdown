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

The [UniFi Protect Integration](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/), adds support for retrieving Camera feeds and Sensor data from a UniFi Protect installation on either a UniFi OS Console running UniFi Protect.

{% include integrations/config_flow.md %}

## Device Support

All known UniFi Protect devices are should be supported. Each device will get a variety of entities added for each of the different entity platforms.

### Camera

A camera entity for each camera channel and RTSP(S) combination found on the NVR device will be created. Only the highest resolution RTSPS camera entity will be enabled by default. Changing your RTSP settings in UniFi Protect will require you to reload the `unifiprotect` integration or restart Home Assistant.

## UniFi Protect Support

### Hardware Support

This Integration supports all UniFi OS Consoles that can run UniFi Protect. Currently this includes:

* UniFi Protect Network Video Recorder (**UNVR**)
* UniFi Protect Network Video Recorder Pro (**UNVRPRO**)
* UniFi Dream Machine Pro (**UDMP**)
* UniFi Cloud Key Gen2 Plus (**CKGP**) firmware version v2.0.24+

Ubiquiti released v2.0.24 as an official firmware release for the CloudKey+, and it is recommended that people upgrade to this UniFi OS based firmware for their CloudKey+, as this gives a much better realtime experience.

CKGP with Firmware v1.x **do NOT run UniFiOS**, you must upgrade to firmware v2.0.24 or newer.

### Software Support

The absolute **minimal** software version is `1.20.0` for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported. Since UniFi Protect has its own release cycle, you should only upgrade UniFi Protect _after_ the next Home Assistant release comes out to ensure the new version is fully supported.

Example: as of `2022.2.0` of Home Assistant, UniFi Protect `1.21.0-beta.1` is the newest UniFi Protect version. So the recommended versions of UniFi Protect to run for a `2022.2.0` version of Home Assistant are `1.20.0`, `1.20.1` or `1.21.0-beta.1`.

## Prerequisites

Before you install this Integration you need to ensure that the following two settings are applied in UniFi Protect.

### Local User

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

The Integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera. With the latest versions of UniFi Protect, the stream is enabled per default, but it is recommended to just check that this is done. To check and enable the the feature

1. open UniFi Protect and click on *Devices*
2. Select *Manage* in the Menu bar at the top
3. Click on the + Sign next to RTSP
4. Enable minimum 1 stream out of the 3 available. UniFi Protect will select the Stream with the Highest resolution as the default enabled one.

#### Minimizing Latency

To minimize the latency to your UniFi Protect cameras, you will want to [enable LL-HLS in the stream integration](/integrations/stream/#ll-hls). You will also want to put an HTTP/2 reserve proxy in front of Home Assistant so you can have connection pooling. If you do not add a reverse proxy, you may start to get "Waiting for Websocket..." messages while trying to view too many camera streams at once.

##### Resources

* Nginx Proxy Home Assistant OS Add-on: [![Nginx Proxy Add-on](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_nginx_proxy)

* [Community Guide for Nginx](https://community.home-assistant.io/t/reverse-proxy-using-nginx/196954)
