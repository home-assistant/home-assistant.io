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

An EnOcean switch can take many forms. Currently, only two types have been tested and confirmed to work well: Eltako FSR61 and Permundo PSC234

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
- **subtype** (*Optional*): Only `permundo` and `fsr61` supported. Default to `permundo`.
- **sender_id** (*Optional*): Only needed when using `fsr61` as subtype.

```yaml
# Extensive example configuration.yaml entry
switch:
  - platform: enocean
    name: my_switch_name
    id: [0x01,0x90,0x84,0x3C]
    sender_id: [0xff,0xc6,0xea,0x14]
    subtype: fsr61
```
