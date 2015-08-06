---
layout: page
title: "ASUSWRT support"
description: "Instructions how to integrate ASUSWRT based routers into Home Assistant."
date: 2015-08-06 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/asus.png' class='brand pull-right' />
This platform offers presence detection by looking at connected devices to a [ASUSWRT](http://event.asus.com/2013/nw/ASUSWRT/) based router.

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: asuswrt
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

This device tracker needs telnet to be enabled on the router.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
