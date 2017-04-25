---
layout: page
title: "NAD D 7050"
description: "Instructions how to integrate the NAD D 7050 digital amplifier into Home Assistant."
date: 2017-04-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nad.png
ha_category: Media Player
ha_release: 0.4x
ha_iot_class: "Local Polling"
---


The `nad7050` platform allows you to control a [NAD D 7050](https://nadelectronics.com/product/d-7050-direct-digital-network-amplifier/) digital amplifier from Home Assistant.

To add a NAD receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
    platform: nad7050
    host: 192.168.0.112
```

Configuration variables:

- **host** (*Required*): The IP address of your amplifier.
- **name** (*Optional*): Name of the device. Default is NAD D 7050.
- **min_volume** (*optional*): Minimum volume in dB to use with the slider. Default is `-60`
- **max_volume** (*optional*): Maximum volume in dB to use with the slider. Default is `-10`
- **volume_step** (*Optional*): The amount in dB you want to increase the volume with when pressing volume up/down. Default is 4 dB.

The maximum volume level of the D 7050 amplifier is +10 db, minimum is -90.


