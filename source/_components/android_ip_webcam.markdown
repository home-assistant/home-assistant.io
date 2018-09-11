---
layout: page
title: "Android IP Webcam"
description: "Connect Android devices as an IP webcam to Home Assistant"
date: 2017-03-10 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: android_ip_webcam.png
ha_category: Hub
ha_release: "0.40"
ha_iot_class: "Local Polling"
---

The `android_ip_webcam` component turns an Android phone into a network camera with multiple viewing options.

It's setup as an MJPEG camera and all settings as switches inside of Home Assistant. You can also expose the sensors. If you have multiple phones, you can use all options inside a list.

To set it up, download [the IP Webcam app][app], and add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
android_ip_webcam:
  - host: 192.168.1.10
```

Configuration variables:

- **host** (*Required*): The IP Address of the phone on the network.
- **port** (*Optional*): Default is set 8080. The port the IP Webcam listens on.
- **name** (*Optional*): Override the name of the phone.
- **username** (*Optional*): The username to access the phone.
- **password** (*Optional*): The password to access the phone.
- **scan_interval** (*Optional*): Default is 10 seconds. Defines the update interval of the phone.
- **sensors** array (*Optional*): Conditions to display sensor in the frontend. See the list of supported sensors.
- **switches** array (*Optional*): Conditions to display settings in the frontend. See the list of supported settings.
- **motion_sensor** (*Optional*): Activate motion sensor if auto_discovery is disabled.

<p class='note'>
  You need to enable logging in the Android app (`Data logging` > `Enable data logging`), if you wish to see the sensor states in Home Assistant. The sensor states stays as `unknown`, until it's enabled.
</p>

### {% linkable_title Supported features %}

Sensors:

- audio_connections
- battery_level
- battery_temp
- battery_voltage
- light
- motion
- pressure
- proximity
- sound
- video_connections

Settings (Switches):

- exposure_lock
- ffc
- focus
- gps_active
- night_vision
- overlay
- torch
- whitebalance_lock
- video_recording

## {% linkable_title Full example %}

```yaml
# Example configuration.yaml entry
android_ip_webcam:
  - host: 192.168.1.202
    port: 8000
    sensors:
      - audio_connections
      - battery_level
      - battery_temp
      - battery_voltage
      - light
      - motion
      - pressure
      - proximity
      - sound
      - video_connections
    switches:
      - exposure_lock
      - ffc
      - focus
      - gps_active
      - night_vision
      - overlay
      - torch
      - whitebalance_lock
      - video_recording
  - host: 192.168.1.203
    port: 8000
    sensors:
      - light
    switches:
      - torch
```

[app]: https://play.google.com/store/apps/details?id=com.pas.webcam
