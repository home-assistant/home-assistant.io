---
layout: page
title: "Actiontec"
description: "Instructions on how to integrate Actiontec routers into Home Assistant."
date: 2015-08-30 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: actiontec.png
ha_category: Presence Detection
---


This platform allows you to detect presence by looking at connected devices to an [Actiontec](http://www.actiontec.com/) device.

Supported devices (tested):

- MI424WR (Verizon FIOS)

<p class='note warning'>
This device tracker needs telnet to be enabled on the router.
</p>

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: actiontec
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. `192.168.1.1`.
- **username** (*Required*: The username of an user with administrative privileges, usually `admin`.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

