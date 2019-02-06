---
layout: page
title: "EnOcean Cover"
description: "Instructions on how to set up EnOcean cover within Home Assistant."
date: 2019-01-06 22:32
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Cover
ha_release: 0.87
ha_iot_class: "Local Push"
---

An EnOcean cover can take many forms. Currently only one type has been tested: [NodOn SIN-2-RS-01 – Roller Shutter Module](https://nodon.fr/nodon/module-encastre-pour-volets-roulants-stores-enocean/)


To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    name: "The cover name"
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is the 4 bytes long number written on the dimmer.
- **name** (*Optional*): An identifier for the Ligh in the frontend.
