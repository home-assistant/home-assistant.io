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
ha_release: 0.71
ha_iot_class: "Local Push"
---

The `dlna_dmr` platform allows you to control a [DLNA Digital Media Renderer](https://www.dlna.org/), such as DLNA enabled TVs or radios.

To add a DLNA DMR device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: dlna_dmr
    url: http://192.168.0.10:9197/dmr
    name: "TV living room"
```

Configuration variables:

- **url** (*Required*): The URL to the device description, eg. `http://192.168.0.10:9197/dmr`.
- **name** (*Optional*): The name you would like to give to the device, e.g., `TV living room`.
- **max_volume** (*Optional*): Override the maximum volume, e.g., `20`.
- **picky_device** (*Optional*): Some devices, such as Samsung TVs, can be rather picky about the source they play media from. Set this to `true` if the TTS service does not seem to work.
