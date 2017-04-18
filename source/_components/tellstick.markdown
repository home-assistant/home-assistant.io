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


The `tellstick` component integrates [TellStick](http://www.telldus.se/products/tellstick) devices into Home Assistant. This integration allows users to add switches, lights, and sensors which are communicating with 433 Mhz. There are couple of vendors (Capidi Elro, Intertechno, Nexa, Proove, Sartano, and Viking) how are selling products which works with TellStick. For more details, please check the TellStick [compatibility list](http://telldus.se/products/compability).

To get started, add the devices to your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
switch:
  platform: tellstick

sensor:
  platform: tellstick

# All dimmers will be picked up as lights.
light:
  platform: tellstick
```

