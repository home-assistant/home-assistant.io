---
layout: component
title: "RFXtrx light"
description: "Instructions how to integrate RFXtrx lights into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
---
The rfxtrx platform support lights that communicate in the frequency range of 433.92 MHz.

To enable RFXtrx lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: rfxtrx
  devices:
    ac09c4f1: Bedroom Door
    ac09c4f2: Kitchen Door
  automatic_add: True
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new lights.

