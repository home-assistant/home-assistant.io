---
layout: page
title: "TellStick Switch"
description: "Instructions on how to integrate TellStick switches into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Switch
ha_iot_class: "Assumed State"
---


This `tellstick` switch platform allows you to control [TellStick](http://www.telldus.se/products/tellstick) devices.

To use your TellStick device, you first have to set up your [Tellstick hub](/components/tellstick/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: tellstick
```
