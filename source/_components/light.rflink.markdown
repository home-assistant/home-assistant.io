---
layout: page
title: "Rflink Light"
description: "Instructions how to integrate Rflink lights into Home Assistant."
date: 2016-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Light
ha_release: 0.38
---

The `rflink` component support devices that use [Rflink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo Rflink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). Rflink gateway is an Arduino firmware that allows communication with 433Mhz devices using cheap hardware (Arduino + 433Mhz tranceiver).

First you have to set up your [rflink hub](/components/rflink/).

After configuring the Rflink hub lights will be automatically discovered and added.

New/unknown lights can be assigned to a default group automatically by specifying the `new_devices_group` option with a group name. If the group doesn't exist it will be created.

For example:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rflink
  new_devices_group: "New Rflink Lights"
```

Rflink switch/light ID's are composed of: protocol, id, switch. For example: `newkaku_0000c6c2_1`.

Once the ID of a light is known it can be used to configure the light in HA, for example to add it to a different group, hide it or configure a nice name.

Configuring a device as light with a nice name:

```yaml
# Example configuration.yaml entry
light:
  platform: rflink
  devices:
    newkaku_0000c6c2_1:
      name: Living room
```

Configuration variables:

- **devices**  (*Optional*): A list of devices with their name to use in the frontend.
- **new_devices_group** (*Optional*): Create group to add new/unknown devices to.
- **device_defaults**: (*Optional*)
  - **fire_event_** (*Optional*): Set default `fire_event` for Rflink switch devices (see below).
  - **signal_repetitions** (*Optional*): Set default `signal_repetitions` for Rflink switch devices (see below).

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to Rflink ID.
- **type** (*Optional*): Override automatically detected type of the light device, can be: switchable, dimmable or hybrid. See 'Light Types' below.
- **aliasses** (*Optional*): Alternative Rflink ID's this device is known by.
- **fire_event_** (*Optional*): Fire an `button_pressed` event if this device is turned on or off (default: False).
- **signal_repetitions** (*Optional*): Repeat every Rflink command this number of times (default: 1)

### {% linkable_title Light state %}

Initially the state of a light is unknown. When the light is turned on or off (via frontend or 433Mhz remote) the state is known and will be shown in the frontend.

Sometimes a light is controlled by multiple 433Mhz remotes, each remote has its own code programmed in the light. To allow tracking of the state when switched via other remotes add the corresponding remote codes as aliasses:

```yaml
# Example configuration.yaml entry
light:
  platform: rflink
  devices:
    newkaku_0000c6c2_1:
      name: Living room
      aliasses:
        - newkaku_000000001_2
        - kaku_000001_a
```

Any on/off command from any allias ID updates the current state of the light. However when sending a command through the frontend only the primary ID is used.

### {% linkable_title Light types %}

Light devices can come in different forms. Some only switch on and off, other support dimming. Dimmable devices might not always respond nicely to repeated `on` command as they turn into a pulsating state until `on` is pressed again (for example KlikAanKlikUit). The Rflink component support three types of lights to make things work in every situation:

- *Hybrid*: This type sends a `dim` followed by an a `on` command; and `off` commands. This will make dimmable devices turn on at the requested dim level and on/off devices on. One caveat is this type is not compatible with signal repetition as multiple `on` signals will cause dimmers to go into disco mode.
- *Switchable*: Device type that sends only `on` and `off` commands. It work for both on/off and dimmable type switches. However dimmables might have issues with signal repetition (see above).
- *Dimmable*: Sends only `dim` and `off` commands. This does not work on on/off type devices as they don't understand the `dim` command. For dimmers this does not cause issues with signal repetitions.

By default new lights are assigned the `switchable` type. Protocol supporting dimming are assigned the `hybrid` type. Currently only `newkaku` protocol is detected as dimmable. Please refer to Device Support to get your dimmers supported.

### {% linkable_title Hiding/ignoring lights %}

Lights are added automatically when the Rflink gateway intercepts a 433Mhz command in the ether. To prevent cluttering the frontend use any of these methods:

- Configure a `new_devices_group` for lights and optionally add it to a different `view`.
- Hide unwanted devices using [customizations](/getting-started/customizing-devices/)
- [Ignore devices on a platform level](/components/rflink/#ignoring-devices)

### {% linkable_title Device support %}

See [device support](/components/rflink/#device-support)

