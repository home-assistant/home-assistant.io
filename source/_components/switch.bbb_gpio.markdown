---
layout: page
title: "BeagleBone Black GPIO Switch"
description: "Instructions on how to integrate the GPIO of a BeagleBone Black into Home Assistant as a switch."
date: 2017-01-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beaglebone-black.png
ha_category: DIY
ha_release: 0.36
ha_iot_class: "Local Push"
---

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
