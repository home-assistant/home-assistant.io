---
layout: page
title: "Netgear support"
description: "Instructions how to integrate Netgear routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
logo: netgear.png
ha_category: Presence Detection
---

<img src='/images/supported_brands/netgear.png' class='brand pull-right' />
This platform allows you to detect presence by looking at connected devices to a [Netgear](http://www.netgear.com/) device.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: netgear
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
