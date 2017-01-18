---
layout: page
title: "Zennge"
description: "Instructions on how to setup Zengge Bluetooth LED bulbs within Home Assistant."
date: 2017-01-15 10:46
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
featured: false
ha_release: 0.36
---

Support for the Bluetooth smart bulb from [Zengge](http://www.enledcontroller.com/), also sold under brands like Flux. If your bulb works with the Magic Light - BLE app, it should be supported by this component. To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: zengge
    devices:
      00:21:4D:00:00:01:
        name: Bulb 1
      00:22:4D:00:00:fe:
        name: Bulb 2
```

Configuration variables:

- **devices**: A list of devices with their bluetooth address and a custom name to use in the frontend.
