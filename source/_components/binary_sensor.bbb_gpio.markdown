---
layout: page
title: "BeagleBone Black GPIO Binary Sensor"
description: "Instructions on how to integrate the GPIO sensor capability of a BeagleBone Black into Home Assistant."
date: 2017-01-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beaglebone-black.png
ha_category: DIY
ha_release: 0.37
ha_iot_class: "Local Push"
---

The `bbb_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [BeagleBone Black](https://beagleboard.org/black).

## {% linkable_title Configuration %}

To use your BeagleBone Black's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bbb_gpio
    pins:
      P8_12:
        name: Door
      GPIO0_26:
        name: Window
```

{% configuration %}
pins:
  description: List of used pins.
  required: true
  type: map
  keys:
    pin_name:
      description: Port numbers and corresponding names.
      required: true
      type: map
      keys:
        name:
          description: Friendly name to use for the frontend.
          required: true
          type: string
        bouncetime:
          description: Debounce time for reading input pin defined in milliseconds [ms].
          required: false
          type: integer
          default: 50
        invert_logic:
          description: If `true`, inverts the input logic to ACTIVE LOW
          required: false
          type: boolean
          default: false
        pull_mode:
          description: Type of internal pull resistor connected to input. Options are `UP` - pull-up resistor and `DOWN` - pull-down resistor.
          required: false
          type: string
          default: UP  
{% endconfiguration %}

For more details about the GPIO layout, visit the [article](http://elinux.org/Beagleboard:BeagleBoneBlack) about the BeagleBone Black.
