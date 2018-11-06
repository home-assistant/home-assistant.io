---
layout: page
title: "LCN Switch"
description: "Instructions on how to setup LCN switches within Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Switch
ha_release: 0.82
ha_iot_class: "Local Push"
---

The `lcn` switch platform allows the control of the following [LCN](http://www.lcn.eu) ports:

- Output ports
- Relays

<p class='note'>
  To control the state of LEDs use the `led` [service call](/component/lcn#service-led).
</p>


## {% linkable_title Configuration %}

The `lcn` component must be configured correctly, see [LCN component](/components/lcn).

```yaml
# Example configuration.yaml entry
switch:
  - platform: lcn
    name: switch_relay1
    friendly_name: "Sprinkler switch"
    address: "myhome.s0.m7"
    output: "relay1"
```

{% configuration %}
name:
  description: "Name of the switch."
  required: true
  type: string
address:
  description: "[Address](/components/lcn#lcn-addresses) of the module/group."
  required: true
  type: string
output:
  description: "Switch source ([OUTPUT_PORT](/components/lcn#ports), [RELAY_PORT](/components/lcn#ports))."
  required: true
  type: string
friendly_name:
  description: "Name to use in the frontend."
  required: false
  type: string
{% endconfiguration %}