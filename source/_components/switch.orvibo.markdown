---
layout: page
title: "Orvibo Switch"
description: "Instructions on how to integrate Orvibo sockets within Home Assistant."
date: 2015-11-15 18:15
sidebar: true
comments: false
sharing: true
footer: true
logo: orvibo.png
ha_category: Switch
---

The `orvibo` switch platform allows you to toggle your Orvibo S20 Wifi Smart Sockets.

To automatically discover Orvibo sockets on your network:

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
```

To specify Orvibo sockets and skip discovery:

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
    discovery: false
    switches:
      - host: IP_ADDRESS
        mac: MA:CA:DD:RE:SS:00
        name: "My Socket"
```

Configuration variables:

- **discovery** (*Optional*): Whether to discover sockets. Defaults to `true`.
- **switches** (*Optional*):
  - **host** (*Required*): IP address of your socket, eg. `192.168.1.10`.
  - **mac** (*Optional*): MAC address of the socket, eg "AA:BB:CC:DD:EE:FF". This is required if the socket is connected to a different subnet to the machine running Home Assistant.
  - **name** (*Optional*): Your name for the socket.

