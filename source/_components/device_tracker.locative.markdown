---
layout: page
title: "Locative"
description: "Instructions on how to use Locative to track devices in Home Assistant."
date: 2015-10-13 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: locative.png
ha_category: Presence Detection
---

<p class='note'>
Locative is no longer under active development. See https://blog.locative.io/bye-everyone-df01871fe949
</p>

This platform allows you to detect presence using [Locative](https://my.locative.io/). Locative is an open source app for [iOS](https://github.com/LocativeHQ/ios-app) and [Android](https://github.com/LocativeHQ/Locative-Android) that allows users to set up a `GET` or `POST` request when a geofence is entered or exited. This can be configured with Home Assistant to update your location.

To integrate Locative in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: locative
```

Install on your smartphone:

- [Android](https://play.google.com/store/apps/details?id=io.locative.app)
- [iOS](https://itunes.apple.com/us/app/geofancy/id725198453)

To configure Locative, you must set up the app to send a `GET` request to your Home Assistant server at `http://<ha_server>/api/locative`. Make sure to include the API password if you have configured a password in Home Assistant (add `?api_password=<password>` to the end of the URL). When you enter or exit a geofence, Locative will send a `GET` request to that URL, updating Home Assistant.  You are not able to specify a device name in Locative.  Instead, you will need to look in your known_devices.yaml file for a new device that Locative will have created on it's first `GET`.  If you had been or are using Owntracks as well, you will need to update the device name used in the Owntracks setup with the name that Locative generated.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/locative.png'/>
</p>

When you enter a geofence, your location name in Home Assistant will be set to the name of the geofence in Locative. When you exit a geofence, your location name in Home Assistant will be set to "not home".

To use Locative in combination with another device tracker, such as [Nmap](/components/device_tracker.nmap_tracker/) or [Netgear](/components/device_tracker.netgear/), fill in the `mac` field to the Locative entry in `known_devices.yaml` with the MAC address of the device you want to track. The state of the device will be determined by the source that reported last.
