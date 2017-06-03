---
layout: page
title: "Yamaha Network Receivers"
description: "Instructions how to integrate Yamaha Network Receivers into Home Assistant."
date: 2016-03-26 0:58 -0700
sidebar: true
comments: false
sharing: true
footer: true
logo: yamaha.png
ha_category: Media Player
---

The `yamaha` platform allows you to control [Yamaha Network Receivers](http://usa.yamaha.com/products/audio-visual/av-receivers-amps/rx) from Home Assistant.

Supported devices:

- HTR-4065
- RX-V473
- RX-V573
- RX-V673
- RX-V773
- And more

To add a Yamaha Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: yamaha
  name: 'Basement Receiver'
```
Configuration variables:

- **name** (*Optional*): Name of the device

A few notes:

- This will automatically search your network for Yamaha receivers.  It will add a media player device for each one.
- Currently the only controls that are available is Power On/Off, Mute, and Volume control. Other functions such as source select are in progress of being developed.

