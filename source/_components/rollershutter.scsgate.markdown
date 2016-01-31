---
layout: component
title: "SCSGate Rollershutter"
description: "Instructions how to integrate SCSGate motorized devices into Home Assistant."
date: 2016-01-31 22:16
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Rollershutter
---
The SCSGate device can control motirized roller shutters connected to the BTicino MyHome system.

To enable SCSGate roller shutters in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rollershutter:
  platform: scsgate
  devices:
    living_room:
      name: Living Room
      scs_id: XXXXX
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.

**Known limitation:** it is not possible to know the current state of the roller shutter.
