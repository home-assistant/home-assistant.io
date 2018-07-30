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
ha_category: Switch
ha_release: 0.36
ha_iot_class: "Local Push"
---

The `bbb_gpio` switch platform allows you to control the GPIOs of your [BeagleBone Black](https://beagleboard.org/black).

To use yourBeagleBone Black's GPIO in your installation, add the following to your `configuration.yaml` file:

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

Configuration variables:

- **pins** array (*Required*): Array of used ports.
  - **pin_name** (*Required*): Port numbers and corresponding names.
    - **name** (*Optional*): Friendly name to use for the frontend.
    - **initial** (*Optional*): Initial state of the pin. Defaults to `false`.
    - **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is `false` (ACTIVE HIGH).

For more details about the GPIO layout, visit the [article](http://elinux.org/Beagleboard:BeagleBoneBlack) about the BeagleBone Black.
