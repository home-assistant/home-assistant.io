---
layout: page
title: "DD-WRT support"
description: "Instructions how to integrate DD-WRT based routers into Home Assistant."
date: 2015-05-11 09:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/ddwrt.png' class='brand pull-right' />
This platform offers presence detection by looking at connected devices to a [DD-WRT](http://www.dd-wrt.com/site/index) based router.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: ddwrt
  host: 192.168.1.1
  username: admin
  password: PASSWORD
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
