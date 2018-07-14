---
layout: page
title: "Broadlink RM2 media player"
description: "Instructions on how to integrate Broadlink RM2 media players within Home Assistant."
date: 2018-07-14
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Media Player
ha_release: 0.74
ha_iot_class: "Local Polling"
---


The `broadlink` media_player platform let you control a media system like a TV using RM2 broadlink devices.

Configuration options:

- **host** (*Required*): The IP address to connect to.
- **mac** (*Required*):  Device mac address.
- **name** (*Optional*): Default BL. name
- **command_on** (*Optional*): Hex string for command to turn on tv
- **command_off** (*Optional*): Hex string for command to turn off tv
- **volume_up** (*Optional*): Hex string for command to turn the volume up
- **volume_down** (*Optional*): Hex string for command to turn the volume down
- **previous_track** (*Optional*): Hex string for command to switch track or channel
- **next_track** (*Optional*): Hex string for command to switch track or channel
- **digits** (*Optional*): Dictionary of hex strings for digits
- **sources** (*Optional*): Dictionary of hex strings for different input sources

To set it up, add the following information to your `configuration.yaml` file:

```yaml
media_player:
  - platform: broadlink
    host: 192.168.0.2
    mac: '11:22:33:44:55:66'
    name: 'Samsung Living Room TV'

    command_on    : 'JgBGAJKVETkRORA6ERQRFBEUERQRFBE5ETkQOhAVEBUQFREUEBUQOhEUERQRORE5EBURFBA6EBUQOhE5EBUQFRA6EDoRFBEADQUAAA=='
    command_off   : 'JgBGAJOVEDoQOhA6DxYPFhAVEBUQFRA6ETkROREUERQRFBEUEBUQFREUERQRORE5EBUQFRE5ETkRORE5ERUQFRA6DzsPFhAADQUAAA=='

    volume_up     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISNxI3EjcSEhISEhISEhISEhISEhISEjcSNxI3EjcSNxIABfgNBQ=='
    volume_down   : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISNxI3EhISNxISEhISEhISEhISEhI3EhISNxI3EjcSNxIABfgNBQ=='

    previous_track: 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhI3EhISEhISEjcSNxI3EjcSEhI3EjcSNxIABfgNBQ=='
    next_track    : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhI3EhISEhI3EhISEhISEjcSEhI3EjcSEhI3EjcSNxIABfgNBQ=='

    digits:
      '0'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '1'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '2'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '3'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '4'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '5'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '6'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '7'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '8'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='
      '9'     : 'JgBGAJOTEjcSNxI3EhISEhISEhISEhI3EjcSNxISEhISEhISEhISEhISEhISEhISEjcSNxISEjcSNxI3EjcSNxISEhISNxIABfgNBQ=='

    sources:
      hdmi  : 'JgBGAJGWETkRORI4ERQRFBAVERQRFBE5ETkROREUEBURFBEUERQQOxA6EBUPOw8WDxYQFRA6DxYQFRA6EBUPOxA6ETkRFBEADQUAAA=='
      dtv   : 'JgBGAJSTEjgSOBI4EhMSExITEhMSExI4EjgSNxMTEhQRFBEUERQRORE4EhQSExITEhMSOBITEhMSExI4EjgSOBI4EhMSOBIADQUAAA=='
```

