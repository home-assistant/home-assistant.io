---
title: Raspberry Pi RF
description: Instructions on how to integrate devices controlled via codes sent with low-cost GPIO RF modules on a Raspberry Pi into Home Assistant as a switch.
ha_category:
  - DIY
ha_release: 0.19
ha_iot_class: Assumed State
ha_domain: rpi_rf
ha_platforms:
  - switch
---

The `rpi_rf` switch platform allows you to control devices over 433/315MHz LPD/SRD signals with generic low-cost GPIO RF modules on a [Raspberry Pi](https://www.raspberrypi.org/).

Interoperable with codes sniffed via [the rpi-rf module](https://pypi.python.org/pypi/rpi-rf) or [rc-switch](https://github.com/sui77/rc-switch).
For more info see the PyPi module description: [rpi-rf](https://pypi.python.org/pypi/rpi-rf).

## Configuration

To enable, add the following to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_rf
    gpio: 17
    switches:
      bedroom_light:
        code_on: 1234567
        code_off: 1234568
      ambilight:
        pulselength: 200
        code_on: 987654
        code_off: 133742
      living_room_light:
        protocol: 5
        code_on: 654321,565874,233555,149874
        code_off: 654320,565873,233554,149873
        signal_repetitions: 15
```

{% configuration %}
gpio:
  description: GPIO to which the data line of the TX module is connected.
  required: true
  type: integer
switches:
  description: The array that contains all switches.
  required: true
  type: list
  keys:
    entry:
      description: Name of the switch. Multiple entries are possible.
      required: true
      type: list
      keys:
        code_on:
          description: Decimal code(s) to switch the device on. To run multiple codes in a sequence, separate the individual codes with commas ','.
          required: true
          type: list
        code_off:
          description: Decimal code(s) to switch the device off. To run multiple codes in a sequence, separate the individual codes with commas ','.
          required: true
          type: list
        protocol:
          description: RF Protocol.
          required: false
          default: 1
          type: integer
        pulselength:
          description: Pulselength.
          required: false
          type: integer
        signal_repetitions:
          description: Number of times to repeat transmission.
          required: false
          default: 10
          type: integer
{% endconfiguration %}
