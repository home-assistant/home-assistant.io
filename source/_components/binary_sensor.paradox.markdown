---
layout: page
title: Paradox zones
description: "Instructions on how to set up Paradox zones as binary sensors"
date: 2016-10-07 10:57
sidebar: true
comments: false
sharing: true
footer: true
logo: paradox.png
ha_category: Binary Sensor
ha_iot_class: "Local Push"
ha_release: 0.30
---

The `paradox` binary sensor platform is a sub module of the [Paradox hub](/components/paradox/) which provides integration with Paradox alarms utilizing the PRT3 module.

Setting up the hub allows you to enable this sensor platform, which exposes all of your zones as binary sensors. Doing so provides visibility of the zones through the UI as well as the ability to trigger automation actions when something happens like a door opening, or a motion sensor trigger.

The PRT3 module have no way to indicate which zones are actually in use. It has to be controlled via the `configuration.yaml` file. Add only the zones you wish to be visible in the UI. Any zones not specified will simply be ignored.

An example `configuration.yaml` file, making zones 11 and 21 visible in the UI will look something like this:

```yaml
# Example Paradox configuration.yaml entry
paradox:
  panel_type: EVO48
  port: /dev/ttyUSB0
  speed: 57600

  zones:
    11:
      name: 'BackDoor'
      type: 'opening'
    21:
      name: 'Lounge'
      type: 'motion'
```

Configuration variables:

- **hub entries** (*Required*): See [Paradox hub](/components/paradox/) for details.
- **zones** (*Optional*): This is a list of the zones in use on the alarm panel that you want to monitor or use for automation in Home Assistant.
- **[zone]number** (*Required*): This number must match the zone number in use on the alarm panel.
- **[zone]name** (*Required*): Use this name to specify a name for the zone as you want to see it displayed in Home Assistant. It does not need to match the name of the zone in the alarm panel. 
- **[zone]type** (*Required*): This is used to designate zones as doors, motion sensors, smoke detectors, etc. The list of available zone types relevant to alarm zones are: `opening`, `motion`, `gas`, `smoke`, `moisture`, `safety`. The default type is a door contact, i.e. `opening`. 

Please refer to the [Paradox hub](/components/paradox/) for the functionality currently supported.

