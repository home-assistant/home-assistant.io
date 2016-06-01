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
---

An EnOcean switch can take many forms. Currently only one type has been tested: Permundo PSC234


To use your EnOcean device, you first have to set up your [EnOcean hub](../enocean) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - name: Television
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is a 4 bytes long number.
- **platform** (*Required*): Set to `enocean`.
- **name** (*Required*): An identifier for the switch
