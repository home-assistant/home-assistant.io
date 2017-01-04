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
ha_release: 0.36
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

# Light state

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

Any on/off command from any light updates the current state of the light. However when sending a command through the frontend only the primary ID is used.

# Hiding/ignoring lights
Lights are added automatically when the Rflink gateway intercepts a 433Mhz command in the ether. To prevent cluttering the frontend use any of these methods:

- Configure a `new_devices_group` for lights and optionally add it to a different `view`.
- Hide unwanted devices using [customizations](https://home-assistant.io/getting-started/customizing-devices/)
- Ignore devices on a platform level: https://home-assistant.io/components/rflink/#ignoring-devices
