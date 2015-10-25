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
ha_category: DIY
---


The rpi_gpio sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rpi_gpio
  ports:
    11: PIR Office
    12: PIR Bedroom
  pull_mode: "UP"
  value_high: "Active"
  value_low: "Inactive"
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **port: name** (*Required*): Your username for the Edimax switch.
- **pull_mode** (*Optional*): The internal pull to use (UP or DOWN). Default is UP.
- **value_high** (*Optional*): The value of the sensor when the port is HIGH. Default is "HIGH".
- **value_low** (*Optional*): The value of the sensor when the port is LOW. Default is "LOW".
- **bouncetime** (*Optional*): The time in milliseconds for port debouncing. Default is 50ms.

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

<p class='note warning'>
If you are not running Raspbian Jessie, you will need to run Home Assistant as root.
</p>

<p class='note warning'>
To avoid having to run Home Assistant as root when using this component, run a Raspbian version released at or after September 29, 2015.
</p>
