---
layout: page
title: "SCSGate Cover"
description: "Instructions how to integrate SCSGate motorized devices into Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: bus_scs.png
ha_category: Cover
---
The SCSGate devices can control motorized covers connected to the BTicino
MyHome system.

To enable SCSGate covers in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  platform: scsgate
  devices:
    living_room:
      name: Living Room
      scs_id: XXXXX
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the
  frontend.

**Known limitation:** it is not possible to know the current state of the
cover.
