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
ha_release: 0.76
ha_iot_class: "Local Polling"
---

The `broadlink` media_player platform lets you control a media system like a TV using RM2 Broadlink devices.

```yaml
# Example base configuration.yaml entry
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

{% configuration %}
port:
  description: The port number to connect to.
  required: false
  type: int
  default: 80
host:
  description: The IP address to connect to.
  required: true
  type: string
mac:
  description: The MAC address of the RM2 device
  required: true
  type: string
name:
  description: Name of the entity
  required: false
  type: string
  default: Broadlink IR Media Player
command_on:
  description: Command to turn device on
  required: false
  type: string
command_off:
  description: Command to turn device off
  required: false
  type: string
volume_up:
  description: Command to turn volume up
  required: false
  type: string
volume_down:
  description: Command to turn volume down
  required: false
  type: string
previous_track:
  description: Command to turn volume up
  required: false
  type: string
next_track:
  description: Command to turn volume down
  required: false
  type: string
sources:
  description: The list of sources available.
  required: false
  type: map
  keys:
    "[identifier]":
      description: The command to trigger this source.
      required: false
      type: string
digits:
  description: Digits for remote control.
  required: false
  type: map
  keys:
    '1':
      description: The command to trigger key.
      required: true
      type: string
    '2':
      description: The command to trigger key.
      required: true
      type: string
    '3':
      description: The command to trigger key.
      required: true
      type: string
    '4':
      description: The command to trigger key.
      required: true
      type: string
    '5':
      description: The command to trigger key.
      required: true
      type: string
    '6':
      description: The command to trigger key.
      required: true
      type: string
    '7':
      description: The command to trigger key.
      required: true
      type: string
    '8':
      description: The command to trigger key.
      required: true
      type: string
    '9':
      description: The command to trigger key.
      required: true
      type: string
    '0':
      description: The command to trigger key.
      required: true
      type: string
{% endconfiguration %}
