---
layout: page
title: "Epson"
description: "Instructions on how to integrate Epson projector into Home Assistant."
date: 2018-03-24 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: epson.png
ha_category: Media Player
featured: true
ha_release: "0.66"
ha_iot_class: "Local Push"
---


The `epson` platform allows you to control a Epson projector from Home Assistant.

To add Epson to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: epson
    host: 192.168.0.123
```

Configuration variables:

- **host** (*Required*): The host name or address of the Epson projector
- **port** (*Optional*): The HTTP port number. Defaults to 80.
- **name** (*Optional*): The name of the device used in the frontend.
- **ssl** (*Optional*): Enable SSL. **It is not working so far.**

Supported features of Epson projector:
- turn on/off
- set input
- set/get color mode
- increase/decrease volume via HDMI CEC
- mute/unmute volume and video input
- send next/previous track via HDMI CEC
