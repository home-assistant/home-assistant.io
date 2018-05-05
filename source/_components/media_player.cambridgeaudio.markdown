---
layout: page
title: "Cambridge Audio (StreamMagic)"
description: "Instructions on how to integrate Cambridge Audio network audio players (using their StreamMagic platform) into Home Assistant."
date: 2018-05-05 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: cambridgeaudio.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.68
---

The `cambridgeaudio` platform allows you to control Cambridge Audio [network audio players](https://www.cambridgeaudio.com/usa/en/products/hi-fi/network-players) that are based on their _StreamMagic_ platform.

Verified to work with:

- Azur 851N

If your non-listed device works with this this platform, if you encounter any bugs, or want to request a specific feature, please feel free to [report them upstream](https://github.com/sebk-666/stream_magic)


A few notes:

- The platform currently does not support the pre-amp features of the player, i.e. no controls for volume, muting, balance and such are currently available.
- The sources menu lets you choose between the (Internet radio) presets you set your player up with. It's currently not possible to switch the actual digital inputs with this platform.


## {% linkable_title Configuration %}

The platform will be loaded automatically by discovery component. If you want to manually configure it, add the following to your `configuration.yaml` file:

```yaml
media_player:
  - platform: cambridgeaudio
    name: CA851N
    host: 192.168.1.31
    poweroff_command: OFF
```

{% configuration %}
name:
  description: The name to display for this device.
  required: false
  type: string
host:
  description: The IP address of this device.
  required: false
  type: string
poweroff_command:
  description: Lets you choose what happens when you power off the player using the platform. OFF turns the player off completely, IDLE sends it into network standby mode. With IDLE the player consumes more power in standby, but can be turned on again remotely.
  required: false
  type: string
  default: OFF
{% endconfiguration %}

