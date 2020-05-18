---
title: "RFXtrx Light"
description: "Instructions on how to integrate RFXtrx lights into Home Assistant."
ha_category:
  - Light
ha_release: 0.7.5
ha_iot_class: Assumed State
ha_domain: rfxtrx
---

The `rfxtrx` platform support lights that communicate in the frequency range of 433.92 MHz.

First you have to set up your [RFXtrx hub](/integrations/rfxtrx/).

The easiest way to find your lights is to add this to your `configuration.yaml`:

```yaml
light:
  - platform: rfxtrx
    automatic_add: true
```

Launch your Home Assistant and go the website. Push your remote and your device should be added:

<p class='img'>
<img src='/images/integrations/rfxtrx/switch.png' />
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

{% configuration %}
devices:
  description: A list of devices.
  required: false
  type: list
  keys:
    name:
      description: Override the name to use in the frontend.
      required: true
      type: string
    fire_event:
      description: Fires an event even if the state is the same as before. Can be used for automations.
      required: false
      default: false
      type: boolean
automatic_add:
  description: To enable the automatic addition of new lights.
  required: false
  default: false
  type: boolean
signal_repetitions:
  description: Because the RFXtrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.
  required: false
  type: integer
{% endconfiguration %}

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>
