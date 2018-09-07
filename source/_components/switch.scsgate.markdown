---
layout: page
title: "SCSGate Switch"
description: "Instructions on how to integrate SCSGate switches into Home Assistant."
date: 2016-01-31 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: bus_scs.png
ha_category: Switch
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The SCSGate device can control switches of the BTicino MyHome system.

To enable SCSGate switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: scsgate
    devices:
      living_room:
        scs_id: XXXXX
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
