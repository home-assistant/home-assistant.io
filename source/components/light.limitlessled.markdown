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

<img src='/images/supported_brands/dialog-information.png' class='brand pull-right' />
The limitlessled can control your [LimitlessLED](http://www.limitlessled.com/) lights from within Home Assistant. The lights are also known as EasyBulb, AppLight, AppLamp, MiLight, LEDme, dekolight or iLight.

To add limitlessled to your installation, add the following to your `configuration.yaml` file:

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
