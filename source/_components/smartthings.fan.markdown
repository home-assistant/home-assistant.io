---
layout: page
title: "SmartThings Fan"
description: "Instructions on setting up Samsung SmartThings fans within Home Assistant."
date: 2018-02-01 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: samsung_smartthings.png
ha_category: Fan
ha_release: ""
ha_iot_class: "Cloud Push"
---

The SmartThings fan platform lets you control Samsung SmartThings connected devices that have fan-control related capabilities.

| Capability        |Fan Features
|-------------------|------------------------------------------------------------|
| [`fanSpeed`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Fan-Speed)            | `speed`

For a SmartThings device to be represented by the fan platform, it must have one or more of the capabilities above in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

<p class='note'>
Entities for this platform are loaded automatically when you configure the [SmartThings component](/components/smartthings). This platform cannot be manually configured.</p>