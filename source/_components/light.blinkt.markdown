---
layout: page
title: "Blinkt!"
description: "Instructions on how to setup Blinkt! RGB LED lights within Home Assistant."
date: 2017-04-30 9:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Light
ha_iot_class: "Local Push"
ha_release: 0.44
---

The `blinkt` light platform lets you control the [Blinkt!](https://shop.pimoroni.com/products/blinkt) board, featuring eight super-bright RGB LEDs.

To enable `blinkt` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: blinkt
```
