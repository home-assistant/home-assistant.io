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
ha_release: 0.16
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
  - platform: yamaha
```
Configuration variables:

- **name** (*Optional*): Name of the device
- **host** (*Optional*): IP address or hostname of the device

A few notes:

- Not specifying the host variable will result in automatically searching your network for Yamaha Receivers.  It will add a media player device for each one.
- In some cases, autodiscovery fails due to a known bug in the receiver's firmware. It is possible to manually specify the reveiver's IP address or via it's hostname (if it is discoverably by your DNS) then.
- Please note: If adding the IP address or hostname manually, you **must** enable network standby on your receiver, or else startup of Home Assistant will hang if you have your receiver switched off.
- Currently the only controls that are available is Power On/Off, Mute, and Volume control. Other functions such as source select are in progress of being developed.

