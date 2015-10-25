---
layout: page
title: "Raspberry PI GPIO switch support"
description: "Instructions how to integrate the GPIO of a Raspberry PI into Home Assistant."
date: 2015-08-07 14:00
sidebar: false
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
---

<img src='/images/supported_brands/raspberry-pi.png' class='brand pull-right' />
The rpi_gpio switch platform allows you to control the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: rpi_gpio
  ports:
    11: Fan Office
    12: Light Desk
```

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

<p class='note warning'>
If you are not running Raspbian Jessie, you will need to run Home Assistant as root.
</p>
