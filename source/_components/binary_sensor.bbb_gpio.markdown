---
layout: page
title: "BeagleBone Black GPIO Binary Sensor"
description: "Instructions how to integrate the GPIO sensor capability of a BeagleBone Black into Home Assistant."
date: 2017-01-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beaglebone-black.png
ha_category: Binary Sensor
ha_release: 0.37
ha_iot_class: "Local Push"
---

The `bbb_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [BeagleBone Black](https://beagleboard.org/black).

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

Configuration variables:

- **pins** array (*Required*): Array of used pins.
  - **pin_name** (*Required*): Pin numbers and corresponding names.
    - **name** (*Required*): Friendly name to use for the frontend.
    - **bouncetime** (*Optional*): Debounce time for reading input pin defined in milliseconds [ms]. Defaults to `50 ms`.
    - **invert_logic** (*Optional*): If `true`, inverts the input logic to ACTIVE LOW. Default is `false` (ACTIVE HIGH).
    - **pull_mode** (*Optional*): Type of internal pull resistor connected to input. Options are `UP` - pull-up resistor and `DOWN` - pull-down resistor. Defaults to `UP`.

For more details about the GPIO layout, visit the [article](http://elinux.org/Beagleboard:BeagleBoneBlack) about the BeagleBone Black.

