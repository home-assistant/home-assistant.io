---
layout: page
title: "RFXtrx Light"
description: "Instructions on how to integrate RFXtrx lights into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Light
ha_release: 0.7.5
ha_iot_class: "Assumed State"
---

The `rfxtrx` platform support lights that communicate in the frequency range of 433.92 MHz.

First you have to set up your [rfxtrx hub](/components/rfxtrx/).

The easiest way to find your lights is to add this to your `configuration.yaml`:

```yaml
light:
  - platform: rfxtrx
    automatic_add: True
```

Launch your Home Assistant and go the website. Push your remote and your device should be added:

<p class='img'>
<img src='/images/components/rfxtrx/switch.png' />
</p>

Here the name is `0b11000102ef9f210010f70` and you can verify that it works from the frontend. Then you should update your configuration to:

```yaml
light:
  platform: rfxtrx
  devices:
    0b11000102ef9f210010f70:
      name: device_name
```

Example configuration:

```yaml
# Example configuration.yaml entry
light:
  platform: rfxtrx
  devices:
    0b11000f10e9e5660b010f70:
      name: Light1
    0b1100100f29e5660c010f70:
      name: Light_TV
```

Configuration variables:

- **devices** (*Required*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new lights.
- **signal_repetitions** (*Optional*): Because the RFXtrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.
- **fire_event** (*Optional*): Fires an event even if the state is the same as before. Can be used for automations.

<p class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes. 
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</p>
