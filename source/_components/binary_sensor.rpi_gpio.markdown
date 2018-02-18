---
layout: page
title: "Raspberry Pi GPIO Binary Sensor"
description: "Instructions how to integrate the GPIO sensor capability of a Raspberry Pi into Home Assistant."
date: 2015-08-30 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Binary Sensor
ha_release: pre 0.7
ha_iot_class: "Local Push"
---

The `rpi_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rpi_gpio
    ports:
      11: PIR Office
      12: PIR Bedroom
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **port: name** (*Required*): Port numbers (BCM mode pin numbers) and corresponding names.
- **pull_mode** (*Optional*): The internal pull to use (UP or DOWN). Default is UP.
- **bouncetime** (*Optional*): The time in milliseconds for port debouncing. Default is 50ms.
- **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

