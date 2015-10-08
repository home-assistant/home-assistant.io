---
layout: page
title: "Blinkstick support"
description: "Instructions how to setup Blinkstick lights within Home Assistant."
date: 2015-10-08 10:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/blinkstick.png' class='brand pull-right' />
The blinkstick platform let you can control your [Blinkstick](https://www.blinkstick.com/) lights from within Home Assistant.

To add blinkstick to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: blinkstick
  serial: /dev/ttyUSB0
  name: Living Room
```

Configuration variables:

- **serial** (*Required*): The port where your stick is connected to.
- **name** (*Required*): Name of the stick.
