---
layout: page
title: "Orvibo Switch"
description: "Instructions how to integrate Orvibo switches within Home Assistant."
date: 2015-11-15 18:15
sidebar: true
comments: false
sharing: true
footer: true
logo: orvibo.png
ha_category: Switch
---

The `orvibo` switch platform allows you to toggle your Orvibo S20 Wifi Smart Switches.

To automatically discover Orvibo switches on your network:

```yaml
switch:
  platform: orvibo
```

To specify Orvibo switches and skip discovery:

```yaml
switch:
  platform: orvibo
  discovery: false
  switches:
  - host: IP_ADDRESS
    mac: MA:CA:DD:RE:SS:00
    name: "My Switch"
```

Configuration variables:

- **discovery** (*Optional*): Whether to discovery switches (default true).
- **switches** (*Optional*):
  - **host** (*Required*): IP address of your switch, eg. 192.168.1.10.
  - **mac** (*Optional*): MAC address of the switch, eg "AA:BB:CC:DD:EE:FF". This is required if the switch is connected to a different subnet to the machine running Home Assistant
  - **name** (*Optional*): Your name for the switch.

