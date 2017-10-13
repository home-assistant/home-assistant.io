---
layout: page
title: "http_rgb"
description: "Instructions how to setup http_rgb lights within Home Assistant."
date: 2017-10-13 14:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.55
---

The `http_rgb` light platform lets you control lights that use a simple [HTTP API protocol](git@github.com:robhowlett/http-rgb).

To enable `http_rgb` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: http_rgb
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the device the Hyperion service is running on.
- **name** (*Optional*): The name of the device used in the frontend.
