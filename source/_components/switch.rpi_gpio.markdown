---
layout: page
title: "Raspberry Pi GPIO Switch"
description: "Instructions on how to integrate the GPIO of a Raspberry Pi into Home Assistant as a switch."
date: 2015-08-07 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
ha_release: pre 0.7
ha_iot_class: "Local Push"
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
  - **port: name** (*Required*): Port numbers and corresponding names (GPIO #).
- **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

<p class='note warning'>
Note that a pin managed by HASS is expected to be exclusive to HASS.
</p>

A common question is what does Port refer to, this number is the actual GPIO # not the pin #.
For example, if you have a relay connected to pin 11 its GPIO # is 17.

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_gpio
    ports:
      17: Speaker Relay
```


