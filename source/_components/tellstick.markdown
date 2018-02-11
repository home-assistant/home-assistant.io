---
layout: page
title: "TellStick"
description: "Instructions how to integrate your TellStick into Home Assistant."
date: 2015-03-28 13:06
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Hub
---


The `tellstick` component integrates [TellStick](http://www.telldus.se/products/tellstick) devices into Home Assistant. This integration allows users to add switches, lights, and sensors which are communicating with 433 MHz. There are a number of vendors (Capidi Elro, Intertechno, Nexa, Proove, Sartano, and Viking) who are selling products that work with TellStick. For more details, please check the TellStick [protocol list](http://developer.telldus.com/wiki/TellStick_conf).

To get started, add the devices to your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
tellstick:
```

```yaml
# Example configuration.yaml entry for hass.io with TellStick add-on
tellstick:
  host: core-tellstick
  port: [50800, 50801]
```
Configuration variables:

- **signal_repetitions** (*Optional*): Because the tellstick sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch and light to try to send each signal repeatedly.
- **host** (*Optional*): If you run tellstick on a other server or with a hass.io add-on.
- **port** (*Optional*): If needed with host config option. Must be port pair, for example `[50800, 50801]`.

