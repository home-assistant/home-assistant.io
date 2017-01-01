---
layout: page
title: "Anthem AV Receivers"
description: "Instructions how to integrate Anthem AV Receivers into Home Assistant."
date: 2016-12-31 23:11
sidebar: true
comments: false
sharing: true
footer: true
logo: anthemav.png
ha_category: Media Player
ha_iot_class: "Local Push"
ha_release: 0.35
---

The `anthemav` platform allows you to control an [Anthem](http://www.anthemav.com/) receiver or processor from Home Assistant.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: anthemav
    host: IP_ADDRESS
    port: 14999
```

Configuration variables:

- **host** (*Required*): IP address of the device. Example: 192.168.1.32
- **port** (*Required*): Network port for the device.  Default is 14999
- **name** (*Optional*): Name of the device
- ***scan_interval** (*Optional*): Scan the device every *x* seconds.
