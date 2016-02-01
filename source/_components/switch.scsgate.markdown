---
layout: component
title: "SCSGate switch"
description: "Instructions how to integrate SCSGate switches into Home Assistant."
date: 2016-01-31 22:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
---

The SCSGate device can control switches of the BTicino MyHome system.

To enable SCSGate switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: scsgate
  devices:
    living_room:
      name: Living Room
      scs_id: XXXXX
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
