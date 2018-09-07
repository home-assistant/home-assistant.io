---
layout: page
title: "TellStick Light"
description: "Instructions on how to integrate TellStick lights into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Light
ha_iot_class: "Assumed State"
---


This `tellstick` light platform allows you to control your [TellStick](http://www.telldus.se/products/tellstick) dimmers.

To use your TellStick device, you first have to set up your [Tellstick hub](/components/tellstick/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: tellstick
```
