---
layout: page
title: "Android IP Webcam Sensor"
description: "Instructions on how to integrate sensors for Android IP webcam within Home Assistant."
date: 2017-03-10 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: android_ip_webcam.png
ha_category: Sensor
ha_release: "0.40"
ha_iot_class: "Local Polling"
---


The `android_ip_webcam` sensor platform lets you observe states of [Android IP webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) sensors through Home Assistant.

Devices will be configured automatically. Please refer to the [component](/components/android_ip_webcam/) configuration on how to setup.

You can setup your own sensors by examining the JSON file from the webcam server: http://IP:8080/sensors.json
