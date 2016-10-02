---
layout: page
title: "Raspberry PI GPIO Switch"
description: "Instructions how to integrate the GPIO of a Raspberry PI into Home Assistant as a switch."
date: 2015-08-07 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
ha_release: pre 0.7
---


The `rpi_gpio` switch platform allows you to control the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_gpio
    ports:
      11: Fan Office
      12: Light Desk
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **port: name** (*Required*): Port numbers and corresponding names.
- **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

