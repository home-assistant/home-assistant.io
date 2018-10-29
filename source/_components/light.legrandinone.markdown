---
layout: page
title: "LegrandInOne Light"
description: "Instructions on how to integrate LegrandInOne lights into Home Assistant."
date: 2016-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Light
ha_release: 0.XX
ha_iot_class: "Assumed state"
---

The `legrandinone` light platform supports devices that use Legrand 88213 PLC to USB gateway, Might be extended to work with Legrand 88328 USB to Zigbee interface.

First you have to set up your [legrandinone hub](/components/legrandinone/).

After configuring the LegrandInOne hub lights will be automatically discovered and added.

LegrandInOne ID's are composed of a 6 digits number visible on the back side of the device. For example: `884574`. 

Once the ID of a light is known it can be used to configure the light in HA, for example to add it to a different group, hide it or configure a nice name.

Configuring a device as light with a nice name:

```yaml
# Example configuration.yaml entry
light:
  - platform: legrandinone
    device_defaults:
      fire_event: true
    devices:
      123456:
        name: Living room
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: list
  keys:
    fire_event:
      description: Set default `fire_event` for LegrandInOne switch devices (see below).
      required: false
      type: boolean
automatic_add:
  description: Automatically add new/unconfigured devices to HA if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of devices with their name to use in the frontend.
  required: false
  type: list
  keys:
    name:
      description: Name for the device.
      required: false
      default: LegrandInOne ID
      type: string
    type:
      description: "Override automatically detected type of the light device, can be: switchable, dimmable, hybrid or toggle. See 'Light Types' below."
      required: false
      default: switchable
      type: string
    fire_event:
      description: Fire a `button_pressed` event if this device is turned on or off.
      required: false
      default: false
      type: boolean
{% endconfiguration %}

### {% linkable_title Light state %}

Initially the state of a light is unknown. When the light is turned on or off (via frontend or remote) the state is known and will be shown in the frontend.

### {% linkable_title Light types %}

Light devices can come in different forms. Some only switch on and off, other support dimming.. The LegrandInOne component support two types of lights to make things work in every situation:

- *Switchable*: Device type that sends only `on` and `off` commands. It work for both on/off and dimmable type switches.
- *Dimmable*: This type sends a `dim` followed by an an `on` command; and `off` commands. This will make dimmable devices turn on at the requested dim level and on/off devices on.

By default new lights are assigned the `switchable` type.

### {% linkable_title Hiding/ignoring lights %}

Lights are added automatically when the LegrandInOne gateway intercepts a command on the bus (or on the air for Zigbee adapters). To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- Hide unwanted devices using [customizations](/getting-started/customizing-devices/)

### {% linkable_title Device support %}

See [device support](/components/legrandinone/#device-support)
