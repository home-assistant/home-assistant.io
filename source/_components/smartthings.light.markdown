---
layout: page
title: "SmartThings Light"
description: "Instructions on setting up Samsung SmartThings lights within Home Assistant."
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

The SmartThings light platform lets you control Samsung SmartThings connected devices that have light-control related capabilities.
| Capability        |Light Features
|-------------------|------------------------------------------------------------|
| [`switchLevel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch-Level)            | `brightness`, `brightness_pct` and `transition`
| [`colorControl`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Control)            | `hs_color`, `xy_color`, `rgb_color` and `color_name`
| [`colorTemperature`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Temperature)            | `color_temp` and `kelvin`

For a SmartThings device to be represented by the light platform, it must have one or more of the capabilities above in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

<p class='note'>
Entities for this platform are loaded automatically when you configure the [SmartThings component](/components/smartthings). This platform cannot be manually configured.</p>