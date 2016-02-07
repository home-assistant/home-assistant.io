---
layout: component
title: "Homematic Thermostat"
description: "Instructions how to integrate Homematic thermostats within Home Assistant."
date: 2015-11-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Thermostat
---


The `homematic` thermostat platform let you control [Homematic](http://www.homematic.com/) thermostat from Home Assistant. Currently there is support for Homematic (HM-TC-IT-WM-W-EU, HM-CC-RT-DN) thermostats using Homegear or Homematic central (CCU1/CCU2).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: homematic
  address: HOMEGEAR/CCU_ADDRESS
  devices:
    Livingroom 1:
      id: DEVICE_SERIAL_NO
    Livingroom 2:
      id: DEVICE_SERIAL_NO
```

Configuration variables:

- **address** (*Required*: Adress of your Homegear or Homeatic central, eg. http://localhost:2001
- **devices** array (*Required*): List of all your Homeatic devices.
  - **name** (*Required*): Name to identify the device.
    - **id** (*Required*): The serial number of the device, eg. MEQ0791521

