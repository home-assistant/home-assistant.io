---
layout: page
title: "RFXtrx Light"
description: "Instructions how to integrate RFXtrx lights into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
---

The `rfxtrx` platform support lights that communicate in the frequency range of 433.92 MHz.

To enable RFXtrx lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: rfxtrx
  signal_repetitions: 3
  devices:
    living_room:
      name: Living Room
      packetid: XXXXX
      fire_event: True
  automatic_add: True
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new lights.
- **signal_repetitions** *Optional*: Because the rxftrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.
- **fire_event** *Optional*: Fires an event even if the state is the same as before. Can be used for automations.
