---
layout: page
title: "SCSGate Light"
description: "Instructions on how to integrate SCSGate lights into Home Assistant."
date: 2016-01-31 19:30
sidebar: true
comments: false
sharing: true
footer: true
logo: bus_scs.png
ha_category: Light
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The SCSGate device can control lights of the BTicino MyHome system.

To enable SCSGate lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
