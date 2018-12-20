---
layout: page
title: "DLNA DMR"
description: "Instructions on how to integrate a DLNA DMR device into Home Assistant."
date: 2018-06-01 14:27
sidebar: true
comments: false
sharing: true
footer: true
logo: dlna.png
ha_category: Media Player
featured: false
ha_release: 0.76
ha_iot_class: "Local Push"
---

The `dlna_dmr` platform allows you to control a [DLNA Digital Media Renderer](https://www.dlna.org/), such as DLNA enabled TVs or radios.

Please note that some devices, such as Samsung TVs, are rather picky about the source used to play from. The TTS service might not work in combination with these devices. If the play_media service does not work, please try playing from a DLNA/DMS (such as [MiniDLNA](https://sourceforge.net/projects/minidlna/)).

## {% linkable_title Configuration %}

To add a DLNA DMR device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: dlna_dmr
    url: http://192.168.0.10:9197/description.xml
```

{% configuration %}
url:
  description: The URL to the device description .xml file, e.g., `http://192.168.0.10:9197/description.xml`.
  required: true
  type: string
listen_ip:
  description: IP to listen on for events from the device. Only set this when the IP is not detected properly.
  required: false
  type: string
listen_port:
  description: Port to listen on for events from the device.
  required: false
  default: 8301
  type: integer
name:
  description: The name you would like to give to the device, e.g., `TV living room`.
  required: false
  type: string
{% endconfiguration %}
