---
layout: page
title: "BT Home Hub 5"
description: "Instructions how to integrate BT Home Hub 5 router into Home Assistant."
date: 2016-06-13 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bt.png
ha_category: Presence Detection
---


This platform offers presence detection by looking at connected devices to a [BT Home Hub 5](https://en.wikipedia.org/wiki/BT_Home_Hub) based router.

To use a BT Home Hub 5 router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bt_home_hub_5
    host: 192.168.1.254
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., 192.168.1.254.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
