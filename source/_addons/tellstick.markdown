---
layout: page
title: "TellStick"
description: "Telldus TellStick service enabler and tools."
date: 2017-11-30 21:43
sidebar: true
comments: false
sharing: true
footer: true
featured: false
---

Setting up the [Tellstick](http://telldus.com) service and tools contained in the [telldus-core](http://developer.telldus.com/) package and adding configuration to enable Tellstick and Tellstick Duo to work on your Hass.io.


To use this add-on, you first install it from the list of Built-in add-ons in Hass.io.
After installation you are presented with a default and example configuration, to alter this you must follow both the JSON format and also be aligned with the [valid parameters for Tellstick configuration file (tellstick.conf)](https://developer.telldus.com/wiki/TellStick_conf).

After any changes has been made to the configuration you need to restart the add-on for the changes to take effect.


Configuration variables:

- **id** (*Required*): This is a number and must be unique for each device. 
- **name** (*Required*): A name for easy identification of the device. 
- **protocol** (*Required*): This is the protocol the device uses. More on the different protocols later down. 
- **model** (*Optional*): The parameter model is only used by some protocols where there exists different types of devices using the same protocol. This can be dimmers versus non-dimmers, codeswitch versus selflearning etc.
- **house** (*Optional*): Depending on protocol the values here can vary a lot to identify or group per house or type.
- **unit** (*Optional*): Unit identifier, in most cases a value between 1 to 16 and often used in combination with house.
- **fade** (*Optional*): Fade is either `true` or `false` and tells a dimmer if is should fade smooth or instand between values (only for IKEA protocol as it seems).
- **code** (*Optional*): A number series based on ones and zeroes often used for dip-switch based devices.




In order to communicate with the add-on you will also need to add Hass.io specific data in the `configuration.yaml` file.
For regular Home Assistant you only add `tellstick:` but for Hass.io and this add-on you need to add internal communication details.


```yaml
# Example configuration.yaml entry

tellstick:
    host: core-tellstick
    port: [50800, 50801]
    
```



To add [lights](https://home-assistant.io/components/light.tellstick/), [sensors](https://home-assistant.io/components/sensor.tellstick/) and [switches](https://home-assistant.io/components/switch.tellstick/) you follow the guidelines for each type individually that is [described for Home Assistant](https://home-assistant.io/components/tellstick/)


## {% linkable_title Examples %}


Example for adding more devices in the add-on configuration (note the comma separator between devices):

```json
{
  "devices": [
    {
      "id": 1,
      "name": "Outdoor light",
      "protocol": "everflourish",
      "model": "selflearning-switch",
      "house": "A",
      "unit": "1"
    },
    {
      "id": 2,
      "name": "Hallway dimmer",
      "protocol": "risingsun",
      "model": "selflearning-dimmer",
      "house": "A",
      "unit": "2"
    }
  ]
}
```
