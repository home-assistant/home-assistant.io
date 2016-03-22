---
layout: page
title: "Wake on LAN Switch"
description: "Instructions how to integrate a wake on lan switch."
date: 2016-03-18 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ethernet.png
ha_category: Switch
---

The `wake_on_lan` (WOL) switch platform allows you to turn on a [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) enabled computer.

<p class='note warning'>
The WOL switch can only turn on your computer and monitor the state. There is no universal way to turn off a computer remotely.
</p>

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  platform: wake_on_lan
  mac_address: "00-01-02-03-04-05"
  name: "WOL"
  host: "192.168.1.1"
```

Configuration variables:

- **mac_address** (*Required*): MAC address to send the wake up command to.
- **name** (*Optional*): The name of the switch. Default is 'Wake on LAN'.
- **host** (*Optional*): The IP address or hostname to check the state of the device (on/off).

