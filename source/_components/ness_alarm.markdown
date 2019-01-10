---
layout: page
title: "Ness Alarm"
description: "Instructions on how to integrate a Ness D8x/D16x alarm system with Home Assistant."
date: 2018-11-25 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ness.png
ha_category: Alarm
ha_release: 0.85
ha_iot_class: "Local Push"
---

The `ness_alarm` component will allow Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through a IP232 module that must be connected to the alarm.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.ness_alarm/): Reports on zone statuses
- [Alarm Control Panel](/components/alarm_control_panel.ness_alarm/): Reports on alarm status, and can be used to arm/disarm the system

The module communicates via the [Ness D8x/D16x ASCII protocol](http://www.nesscorporation.com/Software/Ness_D8-D16_ASCII_protocol.pdf).

## {% linkable_title Configuration %}

A `ness_alarm` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
ness_alarm:
  host: alarm.local
  port: 2401
  zones:
    - name: Garage
      id: 1
    - name: Storeroom
      id: 2
    - name: Kitchen
      id: 3
    - name: Front Entrance
      id: 4
    - name: Front Door
      id: 5
      type: door
```

{% configuration %}
host:
  description: The hostname of the IP232 module on your home network.
  required: true
  type: string
port:
  description: The port on which the IP232 module listens for clients.
  required: true
  type: integer
zones:
  description: List of zones to add
  required: false
  type: list
  keys:
    zone_id:
      description: ID of the zone on the alarm system (i.e Zone 1 -> Zone 16).
      required: true
      type: integer
    name:
      description: Name of the zone.
      required: true
      type: string
    type:
      description: The zone type. Can be any [binary_sensor device class](/components/binary_sensor/#device-class).
      required: false
      default: motion
      type: string
{% endconfiguration %}
