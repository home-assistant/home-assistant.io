---
layout: component
title: "Locative"
description: "Instructions how to use Locative to track devices in Home Assistant."
date: 2015-10-13 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: locative.png
ha_category: Presence Detection
---

This platform allows you to detect presence using [Locative](https://my.locative.io/). Locative is an [open source](https://github.com/LocativeHQ/ios-app) app for iOS that allows users to set up a `GET` or `POST` request when a geofence is entered or exited. This can be configured with Home Assistant to update your location.

To integrate Locative in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: locative
```

To configure Locative, you must set up the app to send a `GET` request to your Home Assistant server at `http://<ha_server>/api/locative`. Make sure to include the API password if you have configured a password in Home Assistant (add `?api_password=<password>` to the end of the URL). When you enter or exit a geofence, Locative will send a `GET` request to that URL, updating Home Assistant.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/locative.png'/>
</p>

When you enter a geofence, your location name in Home Assistant will be set to the name of the geofence in Locative. When you exit a geofence, your location name in Home Assistant will be set to "not home".

To use Locative in combination with another device tracker, such as [nmap](/components/device_tracker.nmap_scanner/) or [Netgear](/components/device_tracker.netgear/), fill in the `mac` field to the Locative entry in `known_devices.yaml` with the MAC address of the device you want to track. The state of the device will be determined by the source that reported last.
