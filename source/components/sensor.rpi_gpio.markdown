---
layout: page
title: "Raspberry PI GPIO sensor support"
description: "Instructions how to integrate the GPIO sensor capability of a Raspberry PI into Home Assistant."
date: 2015-08-30 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/raspberry-pi.png' class='brand pull-right' />
The rpi_gpio sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```
# Example configuration.yaml entry
sensor:
  platform: rpi_gpio
  pull_mode: "UP"
  value_high: "Active"
  value_low: "Inactive"
  ports:
    11: PIR Office
    12: PIR Bedroom
```

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

<p class='note warning'>
As this requires access to the GPIO, you will need to run Home Assistant as root.
</p>

