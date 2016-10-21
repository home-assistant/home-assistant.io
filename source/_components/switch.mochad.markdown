---
layout: page
title: "Mochad Switch"
description: "Instructions how to integrate X10 Mochad switches into Home Assistant."
date: 2016-10-20 21:13
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_iot_class: depends
---

The `mochad` switch platform lets you control an X10 enabled switch device.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  - platform: mochad
    devices:
      - name: Switch A
        address: a1
      - name: Living Room Lamp
        address: a5
```

Configuration variables:

- **name** (*Optional*): The name of the switch. Default is: x10_switch_dev_*address*
- **address** (*Required*): The X10 address of the switch
