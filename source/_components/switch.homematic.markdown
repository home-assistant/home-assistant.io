---
layout: page
title: "Homematic Switch"
description: "Instructions how to integrate Homematic switches within Home Assistant."
date: 2016-06-25 12:24
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Switch
ha_release: 0.23
ha_iot_class: "Local Push"
---


The `homematic` switch platform lets you control [Homematic](http://www.homematic.com/) switches through Home Assistant.
If the switch uses multiple channels to control different devices, you may setup multiple Home Assistant entities. Switches may also be configured as light entities if you have lights attatched to them. Besides that, there a switches that have included sensors, which may also be configured as separate HA entities.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
switch:
  platform: homematic
  address: LEQ1234567
  name: Dishwasher
  button: 1
```

Configuration variables:

- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.
- **button** (*Optional*): Channel of the Homematic interface to interact with. Defaults to 1.

Currently the following devices are supported:

- Switch from 1 to 4 channels
- Dimmer from 1 to 2 channels
- Switch with powermeter

As an example for a HM-ES-PMSw1-DR switch with powermeter sensors:

```yaml
switch:
  - platform: homematic
    address: LEQ1234657
    name: Dishwascher
sensor:
  - platform: homematic
    address: LEQ1234657
    name: Dishwascher Power
    param: POWER
```
