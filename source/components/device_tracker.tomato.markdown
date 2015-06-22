---
layout: page
title: "Tomato support"
description: "Instructions how to integrate Tomato routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/network-wired-disconnected.png' class='brand pull-right' />
Tomato requires an extra config variable called `http_id`. The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: tomato
  host: 192.168.1.1
  username: admin
  password: PASSWORD
  http_id: ABCDEFG
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
