---
layout: page
title: "Netgear support"
description: "Instructions how to integrate Netgear routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/netgear.png' class='brand' />


```yaml
# Example configuration.yaml entry
device_tracker:
  platform: netgear
  host: 192.168.1.1
  username: admin
  password: PASSWORD
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
