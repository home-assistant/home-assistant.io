---
layout: page
title: "TellStick switch support"
description: "Instructions how to integrate TellStick switches into Home Assistant."
date: 2015-08-06 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/telldus_tellstick.png' class='brand pull-right' />
This tellstick switch platform allows you to control [TellStick](http://www.telldus.se/products/tellstick) devices.

To use your TellStick device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: tellstick
  signal_repetitions: 3
```

Configuration variables:

- **signal_repetitions** *Optional*: Because the tellstick sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.

