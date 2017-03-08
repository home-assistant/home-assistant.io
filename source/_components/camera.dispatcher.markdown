---
layout: page
title: "Dispatcher IP Camera"
description: "Instructions how to integrate internal dispatcher cameras within Home Assistant."
date: 2017-03-08 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: camcorder.png
ha_release: 0.40
ha_iot_class: "depends"
---

The `dispatcher` camera platform allows developers to integrate any image data into Home Assistant. Other components or platform can discover this dispatcher camera to view some things.

To enable this camera in your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
camera:
  - platform: dispatcher
    signal: name_of_dispatcher_signal
```

Configuration variables:
- **signal** (*Required*): The signal name of dispatcher signal they send image data to this camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
