---
layout: page
title: "EnOcean Switch"
description: "Instructions on how to set up EnOcean switches within Home Assistant."
date: 2016-05-25 23:49
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Switch
ha_release: 0.21
ha_iot_class: "Local Push"
---

An EnOcean switch can take many forms. Currently, only a few types have been tested: Permundo PSC234 and Nod On SIN-2-1-01.

To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is a 4 bytes long number.
- **name** (*Optional*): An identifier for the switch. Default to `EnOcean Switch`.
- **channel** (*Optional*): The number of the channel (typically 0 or 1) for the output channel to switch. Default to `0`.

```yaml
# Example entries for a switch with 2 outputs (channels), e.g., the Nod On SIN-2-1-01
switch nodon01_0:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_0
    channel: 0

switch nodon01_1:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_1
    channel: 1
```
