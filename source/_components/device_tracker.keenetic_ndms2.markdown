---
layout: page
title: "Keenetic NDMS2 Routers"
description: "Instructions how to integrate Keenetic NDMS2 Routers into Home Assistant."
date: 2017-09-15 15:40
sidebar: true
comments: false
sharing: true
footer: true
logo: keenetic.png
ha_category: Presence Detection
ha_release: 0.54
---

This component offers presence detection by examining devices connected to a [Keenetic](https://keenetic.net/)
Router running NDMS2 firmware.

To use a Keenetic router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: keenetic_ndms2
    host: !secret router_ip
    username: !secret router_username
    password: !secret router_password
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., 192.168.1.1.
- **username** (*Required*): The username to login into the router (user should have read access to web interface of the router).
- **password** (*Required*): The password for the specified username.
- **interface** (*Optional*): Ihe internal name of the interface to get devices connected to. Default is 'Home'. For expert users only. 


See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
