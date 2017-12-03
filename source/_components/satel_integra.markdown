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

- [Binary Sensor](/components/binary_sensor.satel_integra/): Reports on zone statuses
- [Alarm Control Panel](/components/alarm_control_panel.satel_integra/): Reports on alarm status, and can be used to arm/disarm the system

The module communicates via Satel's open TCP protocol published on their website. It subscribes for new events coming from alarm system and reacts to them immediately.

**IMPORTANT:** The library currently doesn't support encrypted connection to your alarm, so you need **to turn off encryption for integration protocol**. In Polish: "koduj integracje" must be unchecked. You will find this setting in your DLOADX program. 

A `satel_integra` section must be present in the `configuration.yaml` file and contain the following options as required:

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

```

Configuration variables:

- **host** (*Required*): The IP address of the Satel Integra ETHM module on your home network, if using socket type. Default: `localhost`
- **port** (*Optional*): The port on which the ETHM module listens for clients using integration protocol. Default: `7094`
- **partition** (*Optional*): The partition to operate on. Integra can support multiple partitions, this platform only supports one. Default: `1`
- **arm_home_mode** (*Optional*): The mode in which arm Satel Integra when 'arm home' is used. Possible options are `1`,`2` or `3`, default being `1`. For more information on what are the differences between them, please refer to Satel Integra manual.
- **zones** (*Optional*): This module does not discover currently which zones are actually in use, so it will only monitor the ones defined in the config. For each zone, a proper ID must be given as well as it's name (does not need to match the one specified in Satel Integra alarm). For more information on the available zone types, take a look at the [Binary Sensor](/components/binary_sensor.alarmdecoder/) docs. *Note: If no zones are specified, Home Assistant will not load any binary_sensor components.*

List of all zone IDs can be taken from DloadX program.

Having configured the zones, you can use them for automation, such as to react on the movement in your bedroom.
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

Enjoy!
