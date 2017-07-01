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
- **source_ignore** (*Optional*): List of sources to hide in the front-end
- **source_names** (*Optional*): Mapping of internal AVR source names to custom ones, allowing to rename e.g. `HDMI1` to `ChromeCast`

A few notes:

- Not specifying the host variable will result in automatically searching your network for Yamaha Receivers. It will add a media player device for each one.
- For receivers that support more than one zone, Home Assistant will add one media player per zone supported by the player, named "$name Zone 2" and "$name Zone 3".
- In some cases, autodiscovery fails due to a known bug in the receiver's firmware. It is possible to manually specify the receiver's IP address or via it's hostname (if it is discoverably by your DNS) then.
- Please note: If adding the IP address or hostname manually, you **must** enable network standby on your receiver, or else startup of Home Assistant will hang if you have your receiver switched off.
- Currently, this component supports powering on/off, mute, volume control and source selection. Playback controls, for instance play and stop are available for sources that supports it.

A full configuration example will look like the sample below:
```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha
    host: 192.168.0.10
    source_ignore:
      - "AUX"
      - "HDMI6"
    source_names:
      HDMI1: "ChromeCast"
      AV4: "Vinyl"
```
