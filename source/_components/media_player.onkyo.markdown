---
layout: page
title: "Onkyo Network Receivers"
description: "Instructions how to integrate Onkyo Network Receivers into Home Assistant."
date: 2016-03-31 23:53
sidebar: true
comments: false
sharing: true
footer: true
logo: onkyo.png
ha_category: Media Player
---


The `onkyo` platform allows you to control a [Onkyo Network Receiver](http://www.onkyousa.com/Products/prod_class.php?class=Receiver) from Home Assistant.

Supported devices:

- All Onkyo Network Receivers should be supported.

To add a Onkyo Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: onkyo
```
Receivers on the network will be automatically discovered.

A few notes:
- Play/Pause, power, and source selection are supported.
- Source selection has no front-end UI, but can be controlled by way of service calls. Select the source string from the following list:

```
  video1
  video2
  video3
  video4
  video5
  video6
  video7
  dvd
  bd-dvd
  tape1
  tv-tape
  tape2
  phono
  cd
  tv-cd
  fm
  am
  tuner
  dlna
  internet-radio
  usb
  network
  universal-port
  multi-ch
  xm
  sirius
  ```
- Sample automation and input select
```
automation:
  alias: Receiver Source
  trigger:
    platform: state
    entity_id: input_select.receiver_source
  action:
    service: media_player.select_source
    data_template:
      entity_id: media_player.txnr535_000000000000
      source: >
        {% if is_state('input_select.receiver_source', 'HTPC') %}
          pc
        {% elif is_state('input_select.receiver_source', 'Chromecast') %}
          aux1
        {% elif is_state('input_select.receiver_source', 'Wii U') %}
          game
        {% elif is_state('input_select.receiver_source', 'Bluray') %}
          bd
        {% elif is_state('input_select.receiver_source', 'Raspberry Pi') %}
          tv
        {% endif %}
        
input_select:
  receiver_source:
  name: Source
  options:
    - HTPC
    - Chromecast
    - Wii U
    - Bluray
    - Raspberry Pi
  initial: None

```
