---
layout: page
title: "DD-WRT"
description: "Instructions on how to integrate DD-WRT based routers into Home Assistant."
date: 2015-05-11 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ddwrt.png
ha_category: Presence Detection
ha_release: pre 0.7
---

This platform offers presence detection by looking at connected devices to a [DD-WRT](http://www.dd-wrt.com/site/index) based router.

To use a DD-WRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ddwrt
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., `192.168.1.1`.
- **username** (*Required*: The username of an user with administrative privileges, usually `admin`.
- **password** (*Required*): The password for your given admin account.

By default Home Assistant pulls information about connected devices from DD-WRT every 5 seconds.
See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
