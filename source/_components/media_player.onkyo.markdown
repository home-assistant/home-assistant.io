---
layout: page
title: "Onkyo"
description: "Instructions how to integrate Onkyo receivers into Home Assistant."
date: 2016-03-30 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: onkyo.png
ha_category: Media Player
---


The `onkyo` platform allows you to control a [Onkyo receiver](http://www.onkyo.com/) from Home Assistant.

To add an Onkyo receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: onkyo
```

A few notes:

Source selection has no front-end UI, but can be controlled by way of service calls. Select the source string from the following list:

- video1
- video2
- video3
- video4
- video5
- video6
- video7
- dvd
- bd-dvd
- tape1
- tv-tape
- tape2
- phono
- cd
- tv-cd
- fm
- am
- tuner
- dlna
- internet-radio
- usb
- network
- universal-port
- multi-ch
- xm
- sirius

Sample automation and input select

```yaml
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
        {% raw %}{% if is_state('input_select.receiver_source', 'HTPC') %}
          pc
        {% elif is_state('input_select.receiver_source', 'Chromecast') %}
          aux1
        {% elif is_state('input_select.receiver_source', 'Wii U') %}
          game
        {% elif is_state('input_select.receiver_source', 'Bluray') %}
          bd
        {% elif is_state('input_select.receiver_source', 'Raspberry Pi') %}
          tv
        {% endif %}{% endraw %}
        
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

