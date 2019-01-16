---
layout: page
title: "Raspberry Pi GPIO Binary Sensor"
description: "Instructions on how to integrate the GPIO sensor capability of a Raspberry Pi or Orange Pi into Home Assistant."
date: 2018-01-16 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: DIY
ha_release: pre 0.7
ha_iot_class: "Local Push"
---

The `rpi_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/) or [Orange Pi](http://www.orangepi.org/).

## {% linkable_title Configuration %}

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rpi_gpio
    ports:
      11: PIR Office
      12: PIR Bedroom
```

{% configuration %}
ports:
  description: List of used ports.
  required: true
  type: map
  keys:
    "port: name":
      description: Port numbers and corresponding names (GPIO number). For Raspberry Pi boards this is the BCM style pin numbering, for Orange Pi it is the SUNXI style pin numbering (i.e. PA7).
      required: true
      type: string
bouncetime:
  description: The time in milliseconds for port debouncing.
  required: false
  type: integer
  default: 50
invert_logic:
  description: If `true`, inverts the output logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
pull_mode:
  description: >
    Type of internal pull resistor to use.
    Options are `UP` - pull-up resistor and `DOWN` - pull-down resistor.
  required: false
  type: string
  default: "`UP`"
{% endconfiguration %}

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.
