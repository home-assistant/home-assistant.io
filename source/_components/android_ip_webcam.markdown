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

{% configuration %}
host:
  description: The IP Address of the phone on the network.
  required: true
  type: string
port:
  description: The port the IP Webcam listens on.
  required: false
  default: 8080
  type: integer
name:
  description: Override the name of the phone.
  required: false
  default: IP Webcam
  type: string
username:
  description: The username to access the phone.
  required: inclusive
  type: string
password:
  description: The password to access the phone.
  required: inclusive
  type: string
scan_interval:
  description: Defines the update interval of the phone.
  required: false
  default: 10
  type: integer
sensors:
  description: Conditions to display sensor in the frontend. See the list of supported sensors.
  required: false
  type: list
  keys:
    audio_connections:
      description: Audio Connections
    battery_level:
      description: Battery Level
    battery_temp:
      description: Battery Temperature
    battery_voltage:
      description: Battery Voltage
    light:
      description: Light Level
    motion:
      description: Motion
    pressure:
      description: Pressure
    proximity:
      description: Proximity
    sound:
      description: Sound
    video_connections:
      description: Video Connections
switches:
  description: Conditions to display settings in the frontend. See the list of supported switches.
  required: false
  type: list
  keys:
    exposure_lock:
      description: Exposure Lock
    ffc:
      description: Front-facing Camera
    focus:
      description: Focus
    gps_active:
      description: GPS Active
    night_vision:
      description: Night Vision
    overlay:
      description: Overlay
    torch:
      description: Torch
    whitebalance_lock:
      description: White Balance Lock
    video_recording:
      description: Video Recording
motion_sensor:
  description: Activate motion sensor if auto_discovery is disabled.
  required: false
  type: boolean
{% endconfiguration %}

<p class='note'>
  You need to enable logging in the Android app (`Data logging` > `Enable data logging`), if you wish to see the sensor states in Home Assistant. The sensor states stays as `unknown`, until it's enabled.
</p>

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
