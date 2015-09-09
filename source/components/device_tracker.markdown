---
layout: page
title: "Device tracking"
description: "Instructions how to setup device tracking within Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant can get information from your wireless router to track which devices are connected. There are three different types of supported wireless routers:

- [Actiontec](/components/device_tracker.actiontec.html)
- [Aruba](/components/device_tracker.aruba.html)
- [ASUSWRT](/components/device_tracker.asuswrt.html)
- [DD-WRT](/components/device_tracker.ddwrt.html)
- [luci (OpenWRT)](/components/device_tracker.luci.html)
- [netgear](/components/device_tracker.netgear.html)
- [tomato](/components/device_tracker.tomato.html)
- [TP-Link](/components/device_tracker.tplink.html)
- [Thomsom](/components/device_tracker.thomson.html)

You can also decide to directly scan the network for devices by using the [nmap scanner](/components/device_tracker.nmap_scanner.html).

To get started add the following lines to your `configuration.yaml` (example for Netgear):

```yaml
# Example configuration.yaml entry for Netgear device
device_tracker:
  platform: netgear
  host: 192.168.1.1
  username: admin
  password: YOUR_PASSWORD
```

Once tracking, the `device_tracker` component will maintain a file in your config dir called `known_devices.csv`. Edit this file to adjust which devices have to be tracked. Here you can also setup a url for each device to be used as the entity picture.
