---
layout: component
title: "Raspberry PI GPIO sensor"
description: "Instructions how to integrate the GPIO sensor capability of a Raspberry PI into Home Assistant."
date: 2015-08-30 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Sensor
---


The rpi_gpio binary sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rpi_gpio
  ports:
    11: PIR Office
    12: PIR Bedroom
  pull_mode: "UP"
  bouncetime: 50
  invert_logic: false
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **port: name** (*Required*): Port numbers and corresponding names.
- **pull_mode** (*Optional*): The internal pull to use (UP or DOWN). Default is UP.
- **bouncetime** (*Optional*): The time in milliseconds for port debouncing. Default is 50ms.
- **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

<p class='note warning'>
If you are not running Raspbian Jessie, you will need to run Home Assistant as root.
</p>

<p class='note warning'>
To avoid having to run Home Assistant as root when using this component, run a Raspbian version released at or after September 29, 2015.
</p>
