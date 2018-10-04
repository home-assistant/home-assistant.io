---
layout: page
title: "RFLink Binary Sensor"
description: "Instructions on how to integrate RFLink binary sensors into Home Assistant."
date: 2018-10-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Binary Sensor
---


The `rflink` cover platform supports devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example, the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [rflink hub](/components/rflink/).

The RFLink component does not know the difference between a `binary_sensor`, a `switch` and a `light`. Therefore all switchable devices are automatically added as `light` by default.

RFLink binary_sensor/switch/light ID's are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a binary sensor is known it can be used to configure it as a binary sensor type in HA, for example to hide it or configure a nice name.

Configuring a device as motion detector type binary sensor with a nice name:

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0:
         name: PIR Entrance
         device_class: motion
         off_delay: 5
```

Configuration variables:

- **devices** (*Optional*): A list of devices with their name to use in the frontend.

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to RFLink ID.
- **aliases** (*Optional*): Alternative RFLink ID's this device is known by.
- **device_class** (*Optional*): The [type or class of the sensor](/components/binary_sensor/) to set the icon in the frontend.
- **off_delay** (*Optional*): For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
- **force_update** (*Optional*): Sends update events even if the value has not changed. Useful for sensors that only sends `On`. Default `false`

### {% linkable_title Sensor state %}

Initially the state of a binary sensor is unknown. When a sensor update is received the state is known and will be shown in the frontend.

### {% linkable_title Device support %}

See [device support](/components/rflink/#device-support)
