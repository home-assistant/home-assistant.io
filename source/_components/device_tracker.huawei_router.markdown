---
layout: page
title: "Huawei Router"
description: "Instructions how to integrate Huawei Routers into Home Assistant."
date: 2017-07-16 01:40
sidebar: true
comments: false
sharing: true
footer: true
logo: huawei.png
ha_category: Presence Detection
ha_release: 0.51
---

This component offers presence detection by looking at connected devices to a [Huawei router](http://m.huawei.com/enmobile/enterprise/products/network/access/pon-one/hw-371813.htm).
Currently, this was only tested with the Huawei HG8247H and HG8247Q Smart Router (used by Vodafone Portugal).

To use a Huawei router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: huawei_router
    host: 192.168.1.1
    username: user
    password: pass
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*): The username to login into the router (the same used trough the router's web interface).
- **password** (*Required*): The password for the specified username.


See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
