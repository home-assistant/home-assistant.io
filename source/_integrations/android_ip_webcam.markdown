---
title: Android IP Webcam
description: Connect Android devices as an IP webcam to Home Assistant
ha_category:
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: android_ip_webcam
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The **Android IP Webcam** {% term integration %} connects with Android IP Webcam to turn any Android phone or tablet into a network camera with multiple viewing options.

The {% term integration %} is setup as an MJPEG camera with all settings as switches inside Home Assistant. You can also integrate the sensors exposed by the app. If you have multiple phones, you can use all options inside a list.

There is currently support for the following {% term device %} types within Home Assistant:

- Binary sensor
- Camera
- Sensor
- Switch

## Setup

Download [Android IP Webcam app](https://play.google.com/store/apps/details?id=com.pas.webcam) and launch the app. When you press 'Start Server', it will start streaming video from your phone and the IP address of the device will be shown on screen.

{% include integrations/config_flow.md %}

{% note %}
You need to enable logging in the Android app (`Data logging` > `Enable data logging`) if you wish to see the sensor states in Home Assistant. The {% term sensor %} {% term states %} stay as `unknown`, until this is enabled.
{% endnote %}
