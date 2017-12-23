---
layout: page
title: "DoorBird Camera"
description: "Instructions how to integrate DoorBird video doorbell images into Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Camera
ha_release: "0.54"
ha_iot_class: "Local Polling"
---

The `doorbird` implementation allows you to view the live video and previous images from your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

<p class='note'>
  You must have the [DoorBird component](/components/doorbird/) configured to use this camera.
</p>

To enable the camera, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: doorbird
```
