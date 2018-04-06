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
ha_release: 0.68
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

{% configuration %}
host:
  description: The host name or address of the Epson projector
  required: true
  type: string
port:
  description: The HTTP port number. Defaults to 80.
  required: false
  type: int
name:
  description: The name of the device used in the frontend.
  required: false
  type: string
ssl:
  description: Enable SSL. **Feature not tested.**
  required: false
  type: bool
{% endconfiguration %}

Supported features of Epson projector:
- turn on/off
- set input
- set/get color mode
- increase/decrease volume
- mute/unmute audio
- send next/previous track

Supported devices:
- Epson EH-TW5350

To make this module work you need to connect your projector to your LAN. The best is to use iProjection app by Epson to test if it is working.
