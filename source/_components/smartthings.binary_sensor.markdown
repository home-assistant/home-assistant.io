---
layout: page
title: "SmartThings binary_sensor"
description: "Instructions on setting up Samsung SmartThings binary_sensors within Home Assistant."
date: 2018-01-30 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: samsung_smartthings.png
ha_category: Light
ha_release: ""
ha_iot_class: "Cloud Push"
---

The SmartThings binary_sensor platform lets you view Samsung SmartThings connected devices that have sensor-reading capabilities. A binary_sensor entity will be created for each attribute (below) supported by the SmartThings device.

| Capability        |Attribute     |On-Value        |binary_sensor Device Class
|-------------------|--------------|----------------|---------------------------------|
| [`accelerationSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Acceleration-Sensor) | `acceleration` | `active`   | `moving`
| [`contactSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Contact-Sensor)           | `contact`      | `open`     | `opening`
| [`filterStatus`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Filter-Status)             | `filterStatus` | `replace`  | `problem`
| [`motionSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Motion-Sensor)             | `motion`       | `active`   | `motion`
| [`presenceSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Presence-Sensor)         | `presence`     | `present`  | `presence`
| [`tamperAlert`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Tamper-Alert)               | `tamper`       | `detected` | `problem`
| [`valve`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Valve)                            | `valve`        | `open`     | `opening`
| [`waterSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Water-Sensor)               | `water`        | `wet`      | `moisture`

<p class='note'>
Entities for this platform are loaded automatically when you configure the [SmartThings component](/components/smartthings). This platform cannot be manually configured.</p>