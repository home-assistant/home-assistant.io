---
layout: page
title: "Satel Integra Alarm"
description: "Instructions on how to integrate a Satel Integra alarm panel with Home Assistant using an ETHM network extension from Satel."
date: 2017-09-07 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: satel.jpg
ha_category: Hub
ha_release: 0.54
ha_iot_class: "Local Push"
---

The `satel_integra` component will allow Home Assistant users who own a Satel Integra alarm panel to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm  is accomplished through a ETHM extension module that must be installed in the alarm. Compatible with ETHM-1 Plus module with firmware version > 2.00 (version 2.04 confirmed).

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.satel_integra/): Reports on zone or output statuses
- [Alarm Control Panel](/components/alarm_control_panel.satel_integra/): Reports on alarm status, and can be used to arm/disarm the system

The module communicates via Satel's open TCP protocol published on their website. It subscribes for new events coming from alarm system and reacts to them immediately.

## {% linkable_title Setup %}

Please note that **ETHM-1 module is currently not supported**: it does not provide functionality used by this extension. At the moment only ETHM-1 Plus module is supported. That might change in the future, but no promisses are given.

The library currently doesn't support encrypted connection to your alarm, so you need **to turn off encryption for integration protocol**. In Polish: "koduj integracje" must be unchecked. You will find this setting in your DloadX program. 

A list of all zone and output IDs can be acquired by running DloadX program and connecting to your alarm.

For more information on the available zone visualisation types, take a look at the [Binary Sensor](/components/binary_sensor.alarmdecoder/) documentation. Note: If no zones or outputs are specified, Home Assistant will not load any binary_sensor components."

## {% linkable_title Configuration %}

A `satel_integra` section must be present in the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
satel_integra:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the Satel Integra ETHM module on your home network, if using socket type.
  required: true
  default: localhost
  type: string
port:
  description: The port on which the ETHM module listens for clients using integration protocol.
  required: false
  default: 7094
  type: integer
partition:
  description: The partition to operate on. Integra can support multiple partitions, this platform only supports one.
  required: false
  default: 1
  type: integer
arm_home_mode:
  description: The mode in which arm Satel Integra when 'arm home' is used. Possible options are `1`,`2` or `3`. For more information on what are the differences between them, please refer to Satel Integra manual.
  required: false
  default: 1
  type: integer
zones:
  description: "This parameter lists the zones (or inputs) that will be visible by Home Assistant. For each zone, a proper ID must be given as well as its name. The name is arbitrary and does not need to match the one specified in Satel Integra alarm configuration."
  required: false
  type: [integer, list]
  keys:
    name:
      description: Name of the zone.
      required: true
      type: string
    type:
      description: The zone type.
      required: false
      default: motion
      type: string
outputs:
  description: "Very similar to zones, but with outputs. Satel Integra uses outputs to inform external systems about different events. For example power failure, or that alarm started counting for exit or some other user-defined condition. They may be used for simple alarm-based automation. For more information please refer to Satel homepage and forums."
  required: false
  type: [integer, list]
  keys:
    name:
      description: Name of the zone.
      required: true
      type: string
    type:
      description: The zone type.
      required: false
      default: motion
      type: string
{% endconfiguration %}


## {% linkable_title Full examples %}


```yaml
# Example configuration.yaml entry
satel_integra:
  host: 192.168.1.100
  port: 7094
  partition: 1
  arm_home_mode: 1
  zones:
    01:
      name: 'Bedroom'
      type: 'motion'
    02:
      name: 'Hall'
      type: 'motion'
    30:
      name: 'Kitchen - smoke'
      type: 'smoke'
    113:
      name: 'Entry door'
      type: 'opening'
  outputs:
    05:
      name: 'Garden lights trigger'
      type: 'light'
    09:
      name: 'Gate opening trigger'
      type: 'opening'
    30:
      name: 'Alarm triggered'
      type: 'safety'
    32:
      name: 'Alarm power problem'
      type: 'safety'
```

Having configured the zones and the outputs, you can use them for automation, such as to react on the movement in your bedroom.
For example:

```yaml
  alias: Flick the input switch when movement in bedroom detected
  trigger:
      platform: state
      entity_id: 'binary_sensor.bedroom'
      to: 'on'
  action:
      service: input_boolean.turn_on
      data:
        entity_id: input_boolean.movement_detected
```

