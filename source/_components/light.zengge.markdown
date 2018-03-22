---
layout: page
title: "Zengge"
description: "Instructions on how to integrate Zengge Bluetooth bulbs into Home Assistant."
date: 2017-01-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: zengge.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.36
---

The `zengge` platform allows you to integrate your [Zengge Bluetooth bulbs](http://www.zengge.com/) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: zengge
    devices:
      C4:BE:84:51:54:8B:
        name: Living Room
```
Configuration variables:

- **devices** array (*Required*): List of your devices/bulbs.
  - **MAC address** (*Required*): The MAC address of the bulb.
    - **name** (*Optional*): Friendly name for the frontend.
