---
layout: page
title: "Vera support"
description: "Instructions how to setup Vera hubs within Home Assistant."
date: 2015-03-23 20:04
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/vera.png' class='brand' />

```yaml
# Example configuration.yaml entry
sensor:
    platform: vera
    vera_controller_url: http://YOUR_VERA_IP:3480/
    device_data:
        10:
            name: Another sensor

switch:
    platform: vera
    vera_controller_url: http://YOUR_VERA_IP:3480/
    device_data:
        12:
            name: Another Switch

light:
    platform: vera
    vera_controller_url: http://YOUR_VERA_IP:3480/
    device_data:
        11:
            name: Another light
```
