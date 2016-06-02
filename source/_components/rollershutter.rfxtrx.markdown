---
layout: page
title: "RFXtrx Rollershutter"
description: "Instructions how to integrate RFXtrx roller shutters into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Rollershutter
ha_release: 0.7.5
---

The `rfxtrx` platform support Siemens/LightwaveRF roller shutters that communicate in the frequency range of 433.92 MHz.

First you have to set up your [rfxtrx hub.](/components/rfxtrx/)
The easiest way to find your roller shutters is to add this to your `configuration.yaml`:

```yaml
rollershutter:
 platform: rfxtrx
 automatic_add: True
```

Launch your homeassistant and go the website.
Push your remote and your device should be added.

Once added it will show an id (e.g `0b11000102ef9f210010f70`) and you can verify that it works from the frontend.
Then you should update your configuration to:
```yaml
rollershutter:
  platform: rfxtrx
  devices:
    0b11000102ef9f210010f70:
      name: device_name
```

Example configuration:
```yaml
# Example configuration.yaml entry
rollershutter:
  platform: rfxtrx
  automatic_add: False
  signal_repetitions: 2
  devices:
    0b1100ce3213c7f210010f70:
      name: Bedroom Shutter
    0b11000a02ef2gf210010f50:
      name: Bathroom Shutter
    0b1111e003af16aa10000060:
      name: Lounge Shutter
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new roller shutters.
- **signal_repetitions** *Optional*: Because the rxftrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the roller shutter to try to send each signal repeatedly.
- **fire_event** *Optional*: Fires an event even if the state is the same as before. Can be used for automations.
