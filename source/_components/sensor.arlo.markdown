---
layout: page
title: "Arlo Sensor"
description: "Instructions on how to integrate your Netgear Arlo cameras within Home Assistant."
date: 2017-05-30 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: arlo.png
ha_category: Sensor
ha_release: "0.46"
ha_iot_class: "Cloud Polling"
---

To get your [Arlo](https://arlo.netgear.com/) sensors working within Home Assistant, please follow the instructions for the general [Arlo component](/components/arlo).

Once you have enabled the [Arlo component](/components/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arlo
    monitored_conditions:
      - captured_today
      - last_capture
      - total_cameras
      - battery_level
      - signal_strength
```

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **captured_today**: Return the number of videos captured on the current day.
  - **last_capture**: Return the timestamp from the last video captured by your Arlo camera.
  - **total_cameras**: Return the number of recognized and active cameras linked on your Arlo account.
  - **battery_level**: Return the battery level of your Arlo camera.
  - **signal_strength**: Return the wireless signal strength of your Arlo camera.

If no **monitored_conditions** are specified, all of above will be enabled by default.
