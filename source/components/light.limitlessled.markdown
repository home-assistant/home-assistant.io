---
layout: page
title: "LimitlessLED support"
description: "Instructions how to setup LimitlessLED within Home Assistant."
date: 2015-06-10 22:48
sidebar: false
comments: false
sharing: true
footer: true
---

This new platform can control your LimitlessLED lights from within Home Assistant. The lights are also known as EasyBulb, AppLight, AppLamp, MiLight, LEDme, dekolight or iLight.

```
# Example configuration.yaml entry
light:
  platform: limitlessled
  host: 192.168.1.10
  group_1_name: Living Room
  group_2_name: Bedroom
  group_3_name: Office
  group_4_name: Kitchen
```
