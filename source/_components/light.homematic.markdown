---
layout: page
title: "Homematic Light"
description: "Instructions how to integrate Homematic lights within Home Assistant."
date: 2016-06-25 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Light
ha_release: 0.23
ha_iot_class: "Local Push"
---


The `homematic` light platform lets you control [Homematic](http://www.homematic.com/) lights through Home Assistant.
You have the choice to configure switch-devices as light entities within Home Assistant if you have lights attatched to the switch and it makes sense for your setup. If the switch uses multiple channels to control different devices, you may mix the configurations.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
light:
  platform: homematic
  address: LEQ1234567
  name: Kitchen
  button: 1
```

Configuration variables:

- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.
- **button** (*Optional*): Channel of the Homematic interface to interact with. Defaults to 1.

Currently the following devices are supported:
- Switch from 1 to 4 channels
- Dimmer from 1 to 2 channels
- Switch powermeter

As an example for a mixed configuration of a HM-LC-Sw2-FM actor:

```yaml
light:
  platform: homematic
  address: LEQ1234567
  name: Livingroom
  button: 1
switch:
  platform: homematic
  address: LEQ1234567
  name: Ceiling fan
  button: 2
```
