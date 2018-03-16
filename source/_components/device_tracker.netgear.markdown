---
layout: page
title: "Netgear"
description: "Instructions how to integrate Netgear routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: netgear.png
ha_category: Presence Detection
ha_iot_class: "Local Polling"
ha_release: pre 0.7
---


This platform allows you to detect presence by looking at connected devices to a [Netgear](http://www.netgear.com/) device.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: netgear
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, e.g., `192.168.1.1`. If not provided `routerlogin.net` will be used.
- **username** (*Optional*): The username of an user with administrative privileges. If not provided `admin` will be used.
- **port** (*Optional*): The port your router communicates with (defaults to `5000`, but `80` is also known to be used on some models).
- **password** (*Required*): The password for your given admin account.

List of models that are known to use port 80:
- Nighthawk X4S - AC2600 (R7800)
- Orbi

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
