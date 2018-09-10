---
layout: page
title: "TellStick Cover"
description: "Instructions on how to integrate TellStick covers into Home Assistant."
date: 2017-11-29 16:23
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Cover
ha_iot_class: "Assumed State"
ha_release: "0.60"
---


This `tellstick` cover platform allows you to control your [TellStick](http://www.telldus.se/products/tellstick) covers.

To use your TellStick device, you first have to set up your [Tellstick hub](/components/tellstick/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: tellstick
```
