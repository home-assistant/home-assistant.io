---
layout: page
title: "Yamaha MusicCast Receivers"
description: "Instructions on how to integrate Yamaha MusicCast Receivers into Home Assistant."
date: 2017-09-02 22:00 +0100
sidebar: true
comments: false
sharing: true
footer: true
logo: yamaha.png
ha_category: Media Player
ha_release: 0.53
---

The `yamaha_musiccast` platform allows you to control [Yamaha MusicCast Receivers](https://usa.yamaha.com/products/audio_visual/hifi_components/index.html) from Home Assistant.

Supported devices are listed on their [German site](https://de.yamaha.com/de/products/contents/audio_visual/musiccast/products.html).

To add a Yamaha Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha_musiccast
    host: 192.168.xx.xx
```
Configuration variables:

- **host** (*Required*): IP address or hostname of the device
- **port** (*Optional*): UDP Port
- **interval_seconds** (*Optional*): Polling interval (default: 480 seconds = 8 minutes)

A few notes:

- Currently, this component supports powering on/off, mute, volume control, and source selection. Playback controls, for instance, play and stop are available for sources that support it.

A full configuration example will look like the sample below:
```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha_musiccast
    host: 192.168.178.97
    port: 5005
```
