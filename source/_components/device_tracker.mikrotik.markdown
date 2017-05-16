---
layout: page
title: "Mikrotik"
description: "Instructions how to integrate Mikrotik/Routerboard based routers into Home Assistant."
date: 2017-04-28 16:03
sidebar: true
comments: false
sharing: true
footer: true
logo: mikrotik.png
ha_category: Presence Detection
ha_release: "0.43"
---


The `Mikrotik` platform offers presence detection by looking at connected devices to a [Mikrotik Routerboard](http://routerboard.com) based router.

To use an Mikrotik router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mikrotik
    host: 192.168.81.1
    username: admin
    password: hellomoto
    port: 1603
```

Configuration variables:

- **host** (*Required*): The IP address of your router.
- **username** (*Required*: The username of an user with administrative privileges.
- **password** (*Required*): The password for your given admin account.
- **port** (*Optional*): Mikrotik api port (See IP -> Services -> api ), default 8728

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
