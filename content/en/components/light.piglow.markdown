---
layout: page
title: "Piglow"
description: "Instructions on how to setup Piglow LED's within Home Assistant."
date: 2017-01-13 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Light
ha_release: 0.37
ha_iot_class: "Local Polling"
---


The `piglow` platform lets you control the [Piglow](https://shop.pimoroni.com/products/piglow) lights on your Raspberry Pi from within Home Assistant.

To add piglow to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: piglow
```
