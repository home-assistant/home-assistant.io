---
layout: page
title: "Actiontec support"
description: "Instructions how to integrate Actiontec routers into Home Assistant."
date: 2015-08-30 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/actiontec.png' class='brand pull-right' />
This platform allows you to detect presence by looking at connected devices to an [Actiontec](http://www.actiontec.com/) device.

Supported devices:
- MI424WR (Verizon FIOS)

<p class='note warning'>
This device tracker needs telnet to be enabled on the router.
</p>

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: actiontec
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.

