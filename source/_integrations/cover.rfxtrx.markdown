---
title: "RFXtrx Cover"
description: "Instructions on how to integrate RFXtrx covers into Home Assistant."
ha_category:
  - Cover
ha_release: 0.27
ha_domain: rfxtrx
---

The `rfxtrx` platform supports Siemens/LightwaveRF and RFY roller shutters that communicate in the frequency range of 433.92 MHz.

First you have to set up your [RFXtrx hub](/integrations/rfxtrx/).

### Configuration

##### Siemens/LightwaveRF

The easiest way to find your roller shutters is to add this to your `configuration.yaml`:

```yaml
cover:
  - platform: rfxtrx
    automatic_add: true
```

Launch your Home Assistant and go the website (e.g., `http://localhost:8123`). Push your remote and your device should be added.

Once added it will show an ID (e.g `0b11000102ef9f210010f70`) and you can verify that it works from the frontend. Then you should update your configuration to:

```yaml
cover:
  - platform: rfxtrx
    devices:
      0b11000102ef9f210010f70:
        name: device_name
```

##### RFY

The [RFXtrx433e](http://www.rfxcom.com/RFXtrx433E-USB-43392MHz-Transceiver/en) is required for RFY support, however it does not support receive for the RFY protocol - as such devices cannot be automatically added. Instead, configure the device in the [rfxmngr](http://www.rfxcom.com/downloads.htm) tool. Make a note of the assigned ID and Unit Code and then add a device to the configuration with the following id `071a0000[id][unit_code]`. E.g., if the id was `0a` `00` `01`, and the unit code was `01` then the fully qualified id would be `071a00000a000101`, if you set your id/code to single digit in the rfxmngr, e.g., id: `1` `02` `04` and unit code: `1` you will need to add `0` before, so `102031` becomes `071a000001020301`.

##### Common

Example configuration:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rfxtrx
    automatic_add: false
    signal_repetitions: 2 # signal_repetitions: 1 for the Somfy covers (avoid to stop the motion after start)
    devices:
      0b1100ce3213c7f210010f70: # Siemens/LightwaveRF
        name: Bedroom Shutter
      071a00000a000101: # RFY
        name: Bathroom Shutter
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
  description: To enable the automatic addition of new covers (Siemens/LightwaveRF only).
  required: false
  default: false
  type: boolean
signal_repetitions:
  description: Because the rxftrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the roller shutter to try to send each signal repeatedly.
  required: false
  type: integer
{% endconfiguration %}

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>
