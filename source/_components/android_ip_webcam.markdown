---
layout: page
title: "Android IP Webcam"
description: "Connect Android devices as IP webcam to Home Assistant"
date: 2017-03-10 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: android_ip_webcam.png
ha_category: Hub
ha_release: 0.40
---

The [Android IP webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) turns your andorid phone into a network camera with multiple viewing options.

It setup a mjpeg camera view and all settings as switch inside Home Assistant. You can also expose the sensors. If you have multible device, you can use all options inside a list.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
android_ip_webcam:
  - host: 192.168.1.10
```

Configuration variables:

- **host** (*Required*): The ip address where your device have on network.
- **port** (*Optional*): Default is set 8080. The port where is ip wecam listen.
- **name** (*Optional*): This parameter allows you to override the name of your phone.
- **username** (*Optional*): The username for accessing your phone.
- **password** (*Optional*): The password for accessing your phone.
- **scan_interval** (*Optional*): Default is 10 seconds. Defines the update interval of the phone.
- **auto_discovery** (*Optional*): Default is True. Auto detect which sensors and settings are available for setup.
- **sensors** array (*Optional*): Conditions to display sensor in the frontend. See list of supported sensors.
- **switches** array (*Optional*): Conditions to display settings in the frontend. See list of supported settings.
- **motion_sensor** (*Optional*): Activate motion sensor if auto_discovery is disabled.

### {% linkable_title supported features %}

Sensors:

- audio_connections
- battery_level
- battery_temp
- battery_voltage
- light
- motion
- pressure

Settings:

- exposure_lock
- ffc
- focus
- gps_active
- night_vision
- overlay
- torch
- whitebalance_lock
- video_recording
