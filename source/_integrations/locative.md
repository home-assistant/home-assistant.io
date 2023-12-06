---
title: "Locative"
description: "Instructions on how to use Locative to track devices in Home Assistant."
ha_category:
  - Presence detection
ha_release: 0.86
ha_iot_class: Cloud Push
ha_domain: locative
---

This platform allows you to detect presence using [Locative](https://www.locative.app/). Locative is an open source app for [iOS](https://apps.apple.com/us/app/locative/id725198453?ign-mpt=uo%3D4) that allows users to set up a `GET` or `POST` request when a geofence is entered or exited. This can be configured with Home Assistant to update your location.

Install on your smartphone:

- [iOS](https://apps.apple.com/us/app/locative/id725198453?ign-mpt=uo%3D4)

To configure Locative, you must set it up via the integrations panel in the configuration screen. You must set up the app to send a POST request to your Home Assistant instance at the webhook URL provided by the integration during setup. When you enter or exit a geofence, Locative will send the appropriate request to that URL, updating Home Assistant. You are not able to specify a device name in Locative. Instead, you will need to look in your `dev-state` menu for a new device that Locative will have created on its first `GET`. If you had been or are using Owntracks as well, you will need to update the device name used in the Owntracks setup with the name that Locative generated.

<p class='img'>
  <img src='/images/screenshots/locative.png'/>
</p>

When you enter a geofence, your location name in Home Assistant will be set to the name of the geofence in Locative. When you exit a geofence, your location name in Home Assistant will be set to "not home".
