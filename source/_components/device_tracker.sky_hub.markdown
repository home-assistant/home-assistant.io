---
layout: page
title: "Sky Hub"
description: "Instructions on how to integrate Sky Hub routers into Home Assistant."
date: 2017-01-28 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sky.png
ha_category: Presence Detection
ha_release: 0.37
---


The `sky_hub` platform offers presence detection by looking at connected devices to a [Sky Hub router](http://www.sky.com/shop/broadband-talk/sky-hub/) based router.

To use your Sky Hub device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: sky_hub
```

Configuration variables:

- **host** (*Optional*): The IP address of your router. Defaults to `192.168.1.254`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

