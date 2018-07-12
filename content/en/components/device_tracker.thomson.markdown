---
layout: page
title: "Thomson"
description: "Instructions on how to integrate Thomson routers into Home Assistant."
date: 2015-08-30 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: technicolor.png
ha_category: Presence Detection
---


Thomson produced networking equipment (under the brand name SpeedTouch) till 2010 and was then renamed to Technicolor.

This platform allows you to detect presence by looking at connected devices to a [Thomson](http://www.technicolor.com) device.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: thomson
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
