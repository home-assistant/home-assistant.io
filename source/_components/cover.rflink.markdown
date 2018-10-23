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

```text
10;RTS;02FFFF;0412;3;PAIR;
```

Your blinds will go up and down again. This means your Rflink is now paired with your RTS motor.
To check this enter the following code again and see if there is a record.

```text
10;RTSSHOW;
```

```text
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
```

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

{% configuration %}
devices:
  description: A list of devices with their name to use in the frontend.
  required: false
  type: list
  keys:
    name:
      description: The name for the device. Defaults to value for Rflink ID.
      required: false
      type: string
    aliases:
      description: The alternative Rflink ID's this device is known by.
      required: false
      type: list
    fire_event:
      description: Fire a `button_pressed` event if this device is turned on or off.
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: The number of times every Rflink command should repeat.
      required: false
      type: integer
    group:
      description: Allow light to respond to group commands (ALLON/ALLOFF).
      required: false
      default: True
      type: boolean
    group_aliases:
      description: The `aliases` which only respond to group commands.
      required: false
      type: list
    no_group_aliases:
      description: The `aliases` which do not respond to group commands.
      required: false
      type: list
device_defaults:
  description: The default values for a device.
  required: false
  type: list
  keys:
    fire_event:
      description: The default `fire_event` for Rflink cover devices.
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: The default `signal_repetitions` for Rflink cover devices.
      required: false
      default: 1
      type: integer
{% endconfiguration %}

### {% linkable_title Device support %}

See [device support](/components/rflink/#device-support).
