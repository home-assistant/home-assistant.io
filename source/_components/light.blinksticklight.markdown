---
layout: page
title: "Blinkstick"
description: "Instructions how to setup Blinkstick lights within Home Assistant."
date: 2015-10-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: blinkstick.png
ha_category: Light
ha_release: 0.7.5
ha_iot_class: "Local Polling"
---


The `blinkstick` platform lets you control your [Blinkstick](https://www.blinkstick.com/) lights from within Home Assistant.

To add blinkstick to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: blinksticklight
    serial: BS000795-1.1
    name: Living Room
```

Configuration variables:

- **serial** (*Required*): The serial number of your stick.
- **name** (*Required*): Name of the stick.
