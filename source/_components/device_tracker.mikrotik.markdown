---
layout: page
title: "Mikrotik"
description: "Instructions how to integrate Mikrotik/Routerboard based routers into Home Assistant."
date: 2017-02-09 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mikrotik.png
ha_category: Presence Detection
ha_release: "0.38"
---


The `Mikrotik` platform offers presence detection by looking at connected devices to a [Mikrotik Routerboard](http://routerboard.com) based router.

To use an Mikrotik router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mikrotik
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, eg. `192.168.88.1`. It is optional since every Routerboard is also configured by using the IP address 192.168.88.1
- **username** (*Optional*: The username of an user with administrative privileges, usually `admin`.
- **password** (*Optional*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

