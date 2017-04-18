---
layout: page
title: "TellStick Light"
description: "Instructions how to integrate TellStick lights into Home Assistant."
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

To use your TellStick device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: tellstick
  signal_repetitions: 3
```

Configuration variables:

- **signal_repetitions** *Optional*: Because the tellstick sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.

