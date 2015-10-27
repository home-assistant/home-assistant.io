---
layout: component
title: "ASUSWRT"
description: "Instructions how to integrate ASUSWRT based routers into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: asus.png
ha_category: Presence Detection
---


This platform offers presence detection by looking at connected devices to a [ASUSWRT](http://event.asus.com/2013/nw/ASUSWRT/) based router.

<p class='note warning'>
This device tracker needs telnet to be enabled on the router.
</p>

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: asuswrt
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
