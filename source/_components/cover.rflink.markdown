---
layout: page
title: "RFLink Cover"
description: "Instructions on how to integrate RFLink Somfy RTS Cover into Home Assistant."
date: 2017-08-08
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Cover
ha_release: 0.55
---


The `rflink` cover platform supports devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example, the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [rflink hub](/components/rflink/).

After configuring the RFLink hub covers will be automatically discovered and added. Except the Somfy RTS devices.

### {% linkable_title Setting up a Somfy RTS device %}

You have to add the Somfy RTS manually with the supplied RFlinkLoader (Windows only).

Press the Learn button on the original Somfy remote enter the following code within 3 seconds. Your blinds will go up and down shortly:

````
10;RTS;02FFFF;0412;3;PAIR;
````

Your blinds will go up and down again. This means your Rflink is now paired with your RTS motor.
To check this enter the following code again and see if there is a record.

````
10;RTSSHOW;
````
````
RTS Record: 0 Address: FFFFFF RC: FFFF
RTS Record: 1 Address: FFFFFF RC: FFFF
RTS Record: 2 Address: FFFFFF RC: FFFF
RTS Record: 3 Address: 02FFFF RC: 0018
RTS Record: 4 Address: FFFFFF RC: FFFF
RTS Record: 5 Address: FFFFFF RC: FFFF
RTS Record: 6 Address: FFFFFF RC: FFFF
RTS Record: 7 Address: FFFFFF RC: FFFF
RTS Record: 8 Address: FFFFFF RC: FFFF
RTS Record: 9 Address: FFFFFF RC: FFFF
RTS Record: 10 Address: FFFFFF RC: FFFF
RTS Record: 11 Address: FFFFFF RC: FFFF
RTS Record: 12 Address: FFFFFF RC: FFFF
RTS Record: 13 Address: FFFFFF RC: FFFF
RTS Record: 14 Address: FFFFFF RC: FFFF
RTS Record: 15 Address: FFFFFF RC: FFFF
````

After configuring the RFLink Somfy RTS you have to add the cover to the `configuration.yaml` file like any other RFlink device.

RFLink cover ID's are composed of: protocol, id, and gateway. For example: `RTS_0100F2_0`.

Once the ID of a cover is known, it can be used to configure the cover in Home Assistant, for example, to add it to a different group, hide it or set a nice name.

Assigning a name to a cover:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0100F2_0:
        name: SunShade
      bofumotor_455201_0f:
        name: Sovrumsgardin
```

Configuration variables:

- **automatic_add** (*Optional*): Automatically add new/unconfigured devices to Home Assistant if detected (default: `true`).
- **devices**  (*Optional*): A list of devices with their name to use in the frontend.
- **device_defaults**: (*Optional*)
  - **fire_event** (*Optional*): Set default `fire_event` for Rflink switch devices (see below).
  - **signal_repetitions** (*Optional*): Set default `signal_repetitions` for Rflink switch devices (see below).

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to Rflink ID.
- **aliases** (*Optional*): Alternative Rflink ID's this device is known by.
- **fire_event** (*Optional*): Fire a `button_pressed` event if this device is turned on or off (default: `false`).
- **signal_repetitions** (*Optional*): Repeat every Rflink command this number of times (default: 1).
- **fire_event_** (*Optional*): Set default `fire_event` for RFLink switch devices (see below).
- **signal_repetitions** (*Optional*): Set default `signal_repetitions` for RFLink switch devices (see below).
- **group** (*Optional*): Allow light to respond to group commands (ALLON/ALLOFF). (default: yes)
- **group_aliases** (*Optional*): `aliases` which only respond to group commands.
- **no_group_aliases** (*Optional*): `aliases` which do not respond to group commands.


### {% linkable_title Device support %}

See [device support](/components/rflink/#device-support)
