---
layout: page
title: "Raspberry Pi Garage door"
description: "Instructions how to setup the Raspberry Pi garage doors within Home Assistant."
date: 2016-02-12 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Garage Door
ha_release: 0.23
---

```yaml
# Example configuration.yaml entry
garage_door:
  platform: rpi_gpio
  doors:
    - relay_pin: 10
      state_pin: 11
      name: 'Left door'
    - relay_pin: 12
      state_pin: 13
      name: 'Right door'
```