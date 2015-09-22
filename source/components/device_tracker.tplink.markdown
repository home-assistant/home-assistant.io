---
layout: page
title: "TP-Link support"
description: "Instructions how to integrate TP-Link routers into Home Assistant."
date: 2015-06-22 10:30
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/tp-link.png' class='brand pull-right' />
This platform allows you to detect presence by looking at connected devices to a [TP-Link](https://www.tp-link.com) device. This includes the ArcherC9 line.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: tplink
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.


See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
