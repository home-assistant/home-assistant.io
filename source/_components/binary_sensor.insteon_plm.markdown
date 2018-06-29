---
layout: page
title: "Insteon PLM Binary Sensor"
description: "Instructions on how to setup the Insteon PLM binary sensors locally within Home Assistant."
date: 2017-02-19 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Binary Sensor
ha_iot_class: "Local Push"
ha_version: 0.39
---

The `insteon_plm` binary sensor platform lets you control your sensors through 
an INSTEON PowerLinc Modem (PLM) device connected directly to your system on a
USB or serial port.  To add support, set up the primary [insteon_plm]
component.

[insteon_plm]: /components/insteon_plm/

### {% linkable_title Events %}

Some `binary_sensor` devices have an 'on only' mode where the device only
sends an 'on' command, never an 'off' command. Examples of these devices are:
- Motion Sensor
- Mini Remote
To include these devices in an automation when they are configured to this mode
use the `insteon_plm.binary_sensor_on` event. 

Here is an example of how to use these events for automations:

```
automation:
  trigger:
    platform: event
    event_type: insteon_plm.binary_sensor_on
    event_data:
      entity_id: binary_sensor.1a2b3c_3
  condition:
    - condition: state
      entity_id: light.some_light
      state: 'off'
  action:
    service: light.turn_on
    entity_id: light.some_light

```
