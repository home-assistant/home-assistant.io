---
layout: page
title: "RFLink Cover"
description: "Instructions how to integrate RFXtrx covers into Home Assistant."
date: 2016-08-24 14:30
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Cover
ha_release: 0.55
---

The `rflink` cover platform supports devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First you have to set up your [rflink hub](/components/rflink/).

The RFLink component does not know the difference between a `switch` and a `light`. Therefore all switchable devices are automatically added as `light` by default.

RFLink switch/light/cover ID's are composed of: protocol, id, switch. For example: `newkaku_0000c6c2_1`.

Once the ID of a switch is known it can be used to configure it as a switch type in HA, for example to add it to a different group, hide it or configure a nice name.

To add RFLink to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  platform: rflink
  device_defaults:
    fire_event: true
    signal_repetitions: 2
  devices:
    newkaku_0000c6c2_1:
      name: Ceiling fan
    conrad_00785c_0a:
      name: Motion sensor kitchen

```

Configuration variables:

- **devices** (*Optional*): A list of devices with their name to use in the frontend.
- **device_defaults**: (*Optional*)
  - **fire_event** (*Optional*): Set default `fire_event` for RFLink switch devices (see below).
  - **signal_repetitions** (*Optional*): Set default `signal_repetitions` for RFLink switch devices (see below).

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to RFLink ID.
- **aliases** (*Optional*): Alternative RFLink ID's this device is known by.
- **fire_event** (*Optional*): Fire an `button_pressed` event if this device is turned on or off (default: False).
- **signal_repetitions** (*Optional*): Repeat every RFLink command this number of times (default: 1)
- **group** (*Optional*): Allow switch to respond to group commands (ALLON/ALLOFF). (default: yes)
- **group_aliases** (*Optional*): `aliases` which only respond to group commands.
- **no_group_aliases** (*Optional*): `aliases` which do not respond to group commands.

