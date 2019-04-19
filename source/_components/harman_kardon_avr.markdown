---
layout: page
title: "Harman Kardon AVR Network Receivers"
description: "Instructions on how to integrate Harman Kardon AVR Network Receivers into Home Assistant."
date: 2018-11-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: harman_kardon.png
ha_category: Media Player
ha_iot_class: Local Polling
ha_release: 0.85.0
redirect_from:	
 - /components/media_player.harman_kardon_avr/
---

The `harman_kardon_avr` platform allows you to control Harman Kardon Network Receivers from Home Assistant.

Supported devices:

- Harman Kardon AVR-151S
- Other Harman Kardon AVR receivers (untested)

To add a Harman Kardon Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: harman_kardon_avr
    name: NAME
    host: IP_ADDRESS
    port: 10025
    key_interval: 0.2
    simulate_volume_set: False
    sources:
      - name: Television
        source: TV
      - name: Xbox One
        source: Game
```

{% configuration %}
host:
  description: IP address of the device, e.g., 192.168.1.32.
  required: true
  type: string
name:
  description: Name of the device. If not set, Harman Kardon AVR is used.
  required: false
  default: Harman Kardon AVR
  type: string
port:
  description: The port to talk to the receiver. If not set, 10025 is used.
  required: false
  default: 10025
  type: integer
key_interval:
  description: The interval between the keys to send, to stabilise the http requests.
  required: false
  default: 0.2
  type: small_float
simulate_volume_set:
  description: Act as if the volume can be set on the receiver. This can be usefull to integrate with the Google Assistant to control the volume. The volume returned is always 0.5
  required: false
  default: False
  type: boolean
sources:
  description: List of sources to be able to control
  required: false
  default: STB, Radio, TV, Game, AUX
  type: list
  keys:
    name:
      description: The visible source input to choose from
      required: true
      type: string
    source:
      description: The name of the source as the receiver would understand
      required: false
      type: string
      default: Defaults to the name of the source
{% endconfiguration %}

A few notes:

- The newest firmware automatically shuts down the AVR after a certain amount of time. The AVR is then not available on the network anymore, so the 'on' command will not work.
- The AVR has no endpoints to determine the volume, muted, playing etc., so if the remote control is used, HA will not know the new states of the device.