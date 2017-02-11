---
layout: page
title: "Rflink Switch"
description: "Instructions how to integrate Rflink switches into Home Assistant."
date: 2016-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Switch
ha_release: 0.38
---

The `rflink` component support devices that use [Rflink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo Rflink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). Rflink gateway is an Arduino firmware that allows communication with 433Mhz devices using cheap hardware (Arduino + 433Mhz tranceiver).

First you have to set up your [rflink hub](/components/rflink/).

The Rflink component does not know the difference between a `switch` and a `light`. Therefore all switchable devices are automatically added as `light` by default.

Rflink switch/light ID's are composed of: protocol, id, switch. For example: `newkaku_0000c6c2_1`.

Once the ID of a switch is known it can be used to configure it as a switch type in HA, for example to add it to a different group, hide it or configure a nice name.

Configuring a device as switch with a nice name:

```yaml
# Example configuration.yaml entry
switch:
  platform: rflink
  device_defaults:
    fire_event: true
    signal_repetitions: 2
  devices:
    newkaku_0000c6c2_1:
      name: Ceiling fan
      icon: mdi:fan
    conrad_00785c_0a:
      name: Motion sensor kitchen
      icon: mdi:run

```

Configuration variables:

- **devices** (*Optional*): A list of devices with their name to use in the frontend.
- **device_defaults**: (*Optional*)
  - **fire_event_** (*Optional*): Set default `fire_event` for Rflink switch devices (see below).
  - **signal_repetitions** (*Optional*): Set default `signal_repetitions` for Rflink switch devices (see below).

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to Rflink ID.
- **aliasses** (*Optional*): Alternative Rflink ID's this device is known by.
- **fire_event_** (*Optional*): Fire an `button_pressed` event if this device is turned on or off (default: False).
- **signal_repetitions** (*Optional*): Repeat every Rflink command this number of times (default: 1)

# Switch state

Initially the state of a switch is unknown. When the switch is turned on or off (via frontend or 433Mhz remote) the state is known and will be shown in the frontend.

Sometimes a switch is controlled by multiple 433Mhz remotes, each remote has its own code programmed in the switch. To allow tracking of the state when switched via other remotes add the corresponding remote codes as aliasses:

```yaml
# Example configuration.yaml entry
switch:
  platform: rflink
  devices:
    newkaku_0000c6c2_1:
      name: Ceiling fan
      icon: mdi:fan
      aliasses:
        - newkaku_000000001_2
        - kaku_000001_a
```

Any on/off command from any alias ID updates the current state of the switch. However when sending a command through the frontend only the primary ID is used.

# Device support
See [device support](/components/rflink/#device-support)

