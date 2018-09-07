---
layout: page
title: "DuneHD media players"
description: "Instructions on how to integrate DuneHD media players into Home Assistant."
date: 2016-11-26 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dunehd.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.34
---


The `dunehd` platform allows you to control a [Dune HD media player](http://dune-hd.com/eng/products/full_hd_media_players) from Home Assistant. Support is based on the official [IP protocol](http://dune-hd.com/support/ip_control/dune_ip_control_overview.txt) published by Dune.

Devices with firmware 110127_2105_beta or above are supported. Some functions may depend on the version of the protocol (volume / mute control is only available with version 2 onwards).

To add a Dune HD player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: dunehd
    host: IP_ADDRESS
```
Configuration variables:

- **host** (*Required*): IP address or hostname of the device. Example: 192.168.1.32
- **name** (*Optional*): Name of the device.
- **sources** (*Optional*): A name-value dictionary of sources that HA component can request to play.
