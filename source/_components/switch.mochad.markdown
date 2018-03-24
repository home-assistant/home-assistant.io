---
layout: page
title: "Mochad Switch"
description: "Instructions on how to integrate X10 Mochad switches into Home Assistant."
date: 2016-10-20 21:13
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_iot_class: depends
ha_release: 0.32
---

The `mochad` switch platform lets you control an X10 enabled switch device.

To enable this sensor, you first have to set up the [mochad component](/components/mochad/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

Configuration variables:

- **address** (*Required*): The X10 address of the switch.
- **name** (*Optional*): The name of the switch. Default is: x10_switch_dev_*address*.
- **comm_type** (*Optional*): pl (powerline) or rf (radio frequency). Default is pl.

