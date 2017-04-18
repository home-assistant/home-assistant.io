---
layout: component
title: "RFXtrx switch"
description: "Instructions how to integrate RFXtrx switches into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
---
The rfxtrx platform support switches that communicate in the frequency range of 433.92 MHz.

To enable RFXtrx switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  devices:
    living_room:
      name: Living Room
      packetid: XXXXX
  automatic_add: True
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new switches.

