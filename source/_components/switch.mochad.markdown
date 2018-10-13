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

## {% linkable_title Configuration %}

To enable this sensor, you first have to set up the [mochad component](/components/mochad/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

{% configuration %}
address:
  description: The X10 address of the switch.
  required: true
  type: string
name:
  description: The name of the switch.
  required: false
  default: x10_switch_dev_*address*
  type: string
comm_type:
  description: pl (powerline) or rf (radio frequency).
  required: false
  default: pl
  type: string
{% endconfiguration %}
