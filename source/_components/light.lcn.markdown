---
layout: page
title: "LCN Light"
description: "Instructions on how to setup LCN lights within Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Light
ha_release: 0.82
ha_iot_class: "Local Push"
---

The `lcn` light platform allows the control of the following [LCN](http://www.lcn.eu) ports:

- (Dimmable) output ports
- Relays

<p class='note'>
  To control the state of LEDs use the `led` [service call](/component/lcn#service-led).
</p>


## {% linkable_title Configuration %}

The `lcn` component must be configured correctly, see [LCN component](/components/lcn).

```yaml
# Example configuration.yaml entry
light:
  - platform: lcn
    name: light_output1
    friendly_name: "Bedroom light"
    address: "myhome.s0.m7"
    output: "output1"
    dimmable: true
    transition: 5
```

{% configuration %}
name:
  description: "Name of the light."
  required: true
  type: string
address:
  description: "[Address](/components/lcn#lcn-addresses) of the module/group."
  required: true
  type: string
output:
  description: "Light source ([OUTPUT_PORT](/components/lcn#ports), [RELAY_PORT](/components/lcn#ports))."
  required: true
  type: string
dimmable:
  description: Enable the dimming feature for this light (not available for relays)
  required: false
  type: bool
  default: false
transition:
  description: Transition (ramp) time in seconds.
  required: false
  type: int
  default: 0
friendly_name:
  description: "Name to use in the frontend."
  required: false
  type: string
{% endconfiguration %}