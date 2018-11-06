---
layout: page
title: "LCN Cover"
description: "Instructions on how to setup LCN covers within Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Cover
ha_release: 0.82
ha_iot_class: "Local Push"
---

The `lcn` cover platform allows the control of [LCN](http://www.lcn.eu) relays which have been configured as motor controllers.


## {% linkable_title Configuration %}

The `lcn` component must be configured correctly, see [LCN component](/components/lcn).

The `motor` attribute specifies which relay configuration should be used:

| Motor    | Relay on/off | Relay up/down |
| :------: | :----------: | :-----------: |
| `motor1` | `relay1`     | `relay2`      |
| `motor2` | `relay3`     | `relay4`      |
| `motor3` | `relay5`     | `relay6`      |
| `motor4` | `relay7`     | `relay8`      |
 

```yaml
# Example configuration.yaml entry
cover:
  - platform: lcn
    name: cover_1
    friendly_name: "Living room cover"
    address: "myhome.s0.m7"
    motor: "motor1"
```

{% configuration %}
name:
  description: "Name of the cover."
  required: true
  type: string
address:
  description: "[Address](/components/lcn#lcn-addresses) of the module/group."
  required: true
  type: string
motor:
  description: "Motor port ([MOTOR_PORT](/components/lcn#ports))."
  required: true
  type: string
friendly_name:
  description: "Name to use in the frontend."
  required: false
  type: string
{% endconfiguration %}
