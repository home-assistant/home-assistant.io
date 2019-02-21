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
ha_iot_class: "Cloud Push"
---

<p class='note'>
Locative is no longer under active development. See https://blog.locative.io/bye-everyone-df01871fe949
</p>

This platform allows you to detect presence using [Locative](https://my.locative.io/). Locative is an open source app for [iOS](https://github.com/LocativeHQ/ios-app) and [Android](https://github.com/LocativeHQ/Locative-Android) that allows users to set up a `GET` or `POST` request when a geofence is entered or exited. This can be configured with Home Assistant to update your location.

<p class='note'>
You must have the [Locative component](/components/locative/) configured to use this device tracker.
</p>

When you enter a geofence, your location name in Home Assistant will be set to the name of the geofence in Locative. When you exit a geofence, your location name in Home Assistant will be set to "not home".

To use Locative in combination with another device tracker, such as [Nmap](/components/device_tracker.nmap_tracker/) or [Netgear](/components/device_tracker.netgear/), fill in the `mac` field to the Locative entry in `known_devices.yaml` with the MAC address of the device you want to track. The state of the device will be determined by the source that reported last.
