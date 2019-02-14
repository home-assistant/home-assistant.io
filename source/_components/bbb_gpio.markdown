---
layout: page
title: "BeagleBone Black GPIO"
description: "Instructions on how to integrate the GPIO capability of a BeagleBone Black into Home Assistant."
date: 2017-01-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beaglebone-black.png
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.36
ha_iot_class: "Local Push"
redirect_from:
  - /components/binary_sensor.bbb_gpio/
  - /components/switch.bbb_gpio/
---

The `bbb_gpio` component is the base for all [BeagleBone Black](https://beagleboard.org/black) related GPIO platforms in Home Assistant.
There is no setup needed for the component itself.

## {% linkable_title Binary Sensor %}

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

## {% linkable_title Switch %}

The `bbb_gpio` switch platform allows you to control the GPIOs of your [BeagleBone Black](https://beagleboard.org/black).

## {% linkable_title Configuration %}

To use your BeagleBone Black's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: bbb_gpio
    pins:
      GPIO0_7:
        name: LED Red
      P9_12:
        name: LED Green
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
          required: false
          type: string
        initial:
          description: Initial state of the pin.
          required: false
          default: false
          type: boolean
        invert_logic:
          description: If `true`, inverts the input logic to ACTIVE LOW
          required: false
          default: false
          type: boolean
{% endconfiguration %}

For more details about the GPIO layout, visit the [article](http://elinux.org/Beagleboard:BeagleBoneBlack) about the BeagleBone Black.