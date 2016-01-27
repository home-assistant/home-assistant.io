---
layout: component
title: "LIFX"
description: "Instructions how to integrate LIFX into Home Assistant."
date: 2016-01-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lifx.png
ha_category: Light
---

The `lifx` platform allows you to integrate your [LIFX](http://www.lifx.com) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  platform: lifx
  server: 192.168.1.98
  broadcast: 192.168.1.255
```
Configuration variables:

- **server** (*Optional*): Your server address. Only needed if using more than one network interface. Omit if you are unsure.
- **consumer_secret** (*Optional*): The broadcast address, set to reach all LIFX bulbs.

