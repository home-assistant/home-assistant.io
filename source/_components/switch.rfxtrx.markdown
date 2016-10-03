---
layout: page
title: "RFXtrx Switch"
description: "Instructions how to integrate RFXtrx switches into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Switch
ha_release: 0.7.5
---

The `rfxtrx` platform support switches that communicate in the frequency range of 433.92 MHz.

First you have to set up your [rfxtrx hub](/components/rfxtrx/).
The easiest way to find your switches is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: True
```

Launch your homeassistant and go the website.
Push your remote and your device should be added:

<p class='img'>
<img src='/images/components/rfxtrx/switch.png' />
</p>

Here the name is `0b11000102ef9f210010f70` and you can verify that it works from the frontend.
Then you should update your configuration to:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  devices:
    0b11000102ef9f210010f70:
      name: device_name
```

Example configuration:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: False
  signal_repetitions: 2
  devices:
    0b1100ce3213c7f210010f70:
      name: Movment1
    0b11000a02ef2gf210010f50:
      name: Movment2
    0b1111e003af16aa10000060:
      name: Door
      fire_event: True
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new switches.
- **signal_repetitions** (*Optional*): Because the rxftrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.
- **fire_event** (*Optional*): Fires an event even if the state is the same as before. Can be used for automations.
