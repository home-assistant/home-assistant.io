---
layout: page
title: "Homematic Thermostat"
description: "Instructions how to integrate Homematic thermostats within Home Assistant."
date: 2016-06-25 12:08
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Thermostat
ha_release: 0.23
ha_iot_class: "Local Push"
---


The `homematic` thermostat platform lets you control [Homematic](http://www.homematic.com/) thermostats through Home Assistant. MAX!-Thermostats are supported as well.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: homematic
  address: LEQ1234567
  name: Kitchen
```

Configuration variables:

- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.

Currently the following devices are supported:

- Thermostats
- Wall Thermostats
