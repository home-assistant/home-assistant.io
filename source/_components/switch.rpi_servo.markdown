---
layout: page
title: "Raspberry PI Servo Switch"
description: "Instructions on how to use a servo connected to a Raspberry PI into Home Assistant as a switch."
date: 2017-10-23 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
ha_release: 0.57
ha_iot_class: "Local Push"
---


The `rpi_servo` switch platform allows you to control a servo through the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

The servo will have a 'default_position' which it will turn from to the 'position_on' when toggled on, and the 'postion_off' when toggled off. It will remain in these positions for 'enabled_duration' before returning to the 'default_position'. Set the duration to zero to have the servo rest in the on and off state instead.

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_servo
    ports:
      11: TV - Remote
      12: Garage door
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **port: name** (*Required*): Port numbers and corresponding names.
- **default_position** (*Optional*): The degree to rest the servo at. Defaults to 90.
- **position_on** (*Optional*): The degree to rotate to when the switch is toggled to on. Defaults to 180.
- **postion_off** (*Optional*): The degree to rotate to when the switch is toggled off. Defaults to 0.
- **enabled_duration** (*Optional*): How many seconds to activate the servo when turning. Defaults to 1 second. Set to 0 to disable the resting position 'default_position', and instead, rest in the on and off state.

For an example of how to set up the servo, see the [Raspberry Pi Cookbook](http://razzpisampler.oreilly.com/ch05.html).

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

The positions are given in degrees and transformed to pulses with the formula duty = degrees/18 + 2.5.
