---
layout: page
title: "TEMPer Sensor"
description: "Instructions how to integrate TEMPer sensors into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

This `temper` sensor platform allows you to get the current temperature from a TEMPer device.

To use your TEMPer sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: temper
```


Configuration options for the a TCP Sensor:

- **name** (*Optional*): The name you would like to give the sensor in Home Assistant.
- **scale** (*Optional*): The scale for the sensor.
- **offset** (*Optional*): The offset to fix reported vales.

Since some of these sensors consistently show higher temperatures the scale and offset values can be used to fine-tune your sensor.
The calculation follows the formula `scale * sensor value + offset`.

The TEMPer sensors can only be accessed as root by default. To fix the USB permissions on your system create the file `/etc/udev/rules.d/99-tempsensor.rules` and add the following line to it:

```
SUBSYSTEMS=="usb", ACTION=="add", ATTRS{idVendor}=="0c45", ATTRS{idProduct}=="7401", MODE="666"
```

After that re-plug the device and restart Home Assistant.
