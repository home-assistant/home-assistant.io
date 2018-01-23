---
layout: page
title: "NAD"
description: "Instructions how to integrate NAD receivers into Home Assistant."
date: 2018-01-16 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nad.png
ha_category: Media Player
ha_release: 0.62
ha_iot_class: "Local Polling"
---


The `nadtelnet` platform allows you to control a [NAD receiver](http://nadelectronics.com) through telnet from Home Assistant.

To add an NAD receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nadtelnet
    host: 192.168.0.150
```

{% configuration %}
host:
  description: The NAD host name or IP.
  required: true
  type: string
name:
  description: Name of the device.
  required: false
  default: NAD Receiver
  type: string
min_volume:
  description: Minimum volume in dB to use with the slider.
  required: false
  default: -92
  type: int
max_volume:
  description: Maximum volume in dB to use with the slider.
  required: false
  default: -20
  type: int
sources:
  description: A list of mappings from sources to source name.
  required: false
  type: map
  keys:
    1:
      description: A valid source description
      required: false
      type: string
    2:
      description: A valid source description
      required: false
      type: string
    3:
      description: A valid source description
      required: false
      type: string
    4:
      description: A valid source description
      required: false
      type: string
    5:
      description: A valid source description
      required: false
      type: string
    6:
      description: A valid source description
      required: false
      type: string
    7:
      description: A valid source description
      required: false
      type: string
    8:
      description: A valid source description
      required: false
      type: string
    9:
      description: A valid source description
      required: false
      type: string
    10:
      description: A valid source description
      required: false
      type: string
{% endconfiguration %}

The min_volume and max_volume are there to protect you against misclicks on the slider so you will not blow up your speakers when you go from -92dB to +20dB. You can still force it to go higher or lower than the values set with the plus and minus buttons.

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nadtelnet
    host: my_nad.local
    name: NAD Receiver
    min_volume: -60
    max_volume: -20
    sources:
      1: 'Xbox'
      2: 'TV'
      3: 'Music'
```
