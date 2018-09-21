---
layout: page
title: "Logi Circle Sensor"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Camera
ha_release: 0.79
ha_iot_class: "Cloud Polling"
---

The `logi_circle` sensor platform lets you monitor sensors connected to your [Logi Circle](https://circle.logi.com) cameras in Home Assistant.

<p class='note'>
You must have the [Logi Circle component](/components/logi_circle/) configured to use this sensor platform.
</p>

## {% linkable_title Configuration %}

Once you have enabled the [Logi Circle component](/components/logi_circle), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: logi_circle
```

Configuration variables:

- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. The following conditions can be monitored. If not specified, all conditions supported by your camera will be enabled.
  - **battery_level**: Return the battery level percentage from the camera.
  - **last_activity_time**: Return the timestamp from the last time the Logi Circle camera detected any activity.
  - **privacy_mode**: Return the privacy mode status from the camera. 
  - **signal_strength_category**: Return the WiFi signal level from the camera.
  - **signal_strength_percentage**: Return the WiFi signal percentage from the camera.
  - **speaker_volume**: Return the relative speaker volume from the camera (0-100%).
  - **streaming_mode**: Return the streaming mode status from the camera.

Currently it supports all 1st and 2nd generation cameras. Cameras without an internal battery will not expose a `battery_level` sensor.