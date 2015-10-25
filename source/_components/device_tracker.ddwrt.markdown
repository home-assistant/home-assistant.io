---
layout: page
title: "DD-WRT support"
description: "Instructions how to integrate DD-WRT based routers into Home Assistant."
date: 2015-05-11 09:00
sidebar: false
comments: false
sharing: true
footer: true
logo: ddwrt.png
ha_category: Presence Detection
---

<img src='/images/supported_brands/ddwrt.png' class='brand pull-right' />
This platform offers presence detection by looking at connected devices to a [DD-WRT](http://www.dd-wrt.com/site/index) based router.

To use a DD-WRRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: ddwrt
  host: ROUTER_IP_ADDRESS
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
