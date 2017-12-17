---
layout: page
title: "Android IP Webcam Binary Sensor"
description: "Instructions how to integrate binary motion sensors for Android IP webcam within Home Assistant."
date: 2017-03-10 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: android_ip_webcam.png
ha_category: Binary Sensor
ha_release: "0.40"
ha_iot_class: "Local Polling"
---


The `android_ip_webcam` binary sensor platform lets you observe the motion state of [Android IP webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) sensors through Home Assistant.

Devices will be configured automatically. Please refer to the [component](/components/android_ip_webcam/) configuration on how to setup.

## {% linkable_title Examples %}

You can also setup the binary motion sensor with the following script:

{% raw %}
```yaml
binary_sensor:
  - platform: rest
    name: Kitchen Motion
    sensor_class: motion
    resource: http://IP:8080/sensors.json?sense=motion_active
    value_template: '{{ value_json.motion_active.data[0][1][0] | round(0) }}'
```
{% endraw %}
