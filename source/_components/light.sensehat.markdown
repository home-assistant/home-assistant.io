---
layout: page
title: "Sense HAT Light"
description: "Instructions on how to setup Sense HAT LED lights within Home Assistant."
date: 2017-04-29 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sense-hat.png
ha_category: DIY
ha_iot_class: "Assumed State"
ha_release: 0.44
---

The `sensehat` light platform lets you control the [Sense HAT](https://www.raspberrypi.org/products/sense-hat/) board's 8x8 RGB LED matrix on your Raspberry Pi from within Home Assistant.

## {% linkable_title Configuration %}

To add `sensehat` light to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: sensehat
```

