---
layout: page
title: "LegrandInOne Cover"
description: "Instructions on how to integrate LegrandInOne Cover into Home Assistant."
date: 2018-10-26
sidebar: true
comments: false
sharing: true
footer: true
logo: myopen.png
ha_category: Cover
ha_release: 0.XX
---


The `legrandinone` cover platform supports devices that use Legrand 88213 PLC to USB gateway, Might be extended to work with Legrand 88328 USB to Zigbee interface.

First, you have to set up your [legrandinone hub](/components/legrandinone/).

After configuring the LegrandInOne hub covers will be automatically discovered and added.

LegrandInOne ID's are composed of a 6 digits number visible on the back side of the device. For example: `884574`. 

Once the ID of a cover is known, it can be used to configure the cover in Home Assistant, for example, to add it to a different group, hide it or set a nice name.

Assigning a name to a cover:

```yaml
# Example configuration.yaml entry
cover:
  - platform: legrandinone
    devices:
      123456:
        name: Living room - West window
      447788:
        name: Kitchen - North window
```

{% configuration %}
devices:
  description: A list of devices with their name to use in the frontend.
  required: false
  type: list
  keys:
    name:
      description: The name for the device. Defaults to value for LegrandInOne ID.
      required: false
      type: string
    fire_event:
      description: Fire a `button_pressed` event if this device is turned on or off.
      required: false
      default: False
      type: boolean
device_defaults:
  description: The default values for a device.
  required: false
  type: list
  keys:
    fire_event:
      description: The default `fire_event` for LegrandInOne cover devices.
      required: false
      default: False
      type: boolean
{% endconfiguration %}

### {% linkable_title Device support %}

See [device support](/components/legrandinone/#device-support).
