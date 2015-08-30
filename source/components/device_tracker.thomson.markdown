---
layout: page
title: "Thomson support"
description: "Instructions how to integrate Thomson routers into Home Assistant."
date: 2015-08-30 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/technicolor.png' class='brand pull-right' />
Thomson produced networking equipment (under the brand name SpeedTouch) till 2010 and was then renamed to Technicolor.

This platform allows you to detect presence by looking at connected devices to a [Thomson](http://www.technicolor.com) device.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: thomson
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
