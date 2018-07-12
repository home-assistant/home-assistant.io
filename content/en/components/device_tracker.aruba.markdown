---
layout: page
title: "Aruba"
description: "Instructions on how to integrate Aruba routers into Home Assistant."
date: 2015-08-31 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: aruba.png
ha_category: Presence Detection
ha_release: 0.7
---


This platform allows you to detect presence by looking at connected devices to an [Aruba Instant](http://www.arubanetworks.com/products/networking/aruba-instant/) device.

Supported devices (tested):

- ARUBA AP-105

<p class='note warning'>
This device tracker needs telnet to be enabled on the router.
</p>

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aruba
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., `192.168.1.1`.
- **username** (*Required*): The username of an user with administrative privileges, usually `admin`.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

