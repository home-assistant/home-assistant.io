---
layout: page
title: "Xiaomi Router"
description: "Instructions on how to integrate Xiaomi routers into Home Assistant."
date: 2017-01-12 12:04
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Presence Detection
ha_release: 0.36
---


The `xiaomi` platform offers presence detection by looking at connected devices to a [Xiaomi](http://miwifi.com) router.

To use an Xiaomi router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: xiaomi
    host: YOUR_ROUTER_IP
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. `192.168.0.1`.
- **username** (*Optional*: The admin username. By default `admin`.
- **password** (*Required*): The password for the admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

