---
layout: page
title: "Homematic Rollershutter"
description: "Instructions how to integrate Homematic rollershutters within Home Assistant."
date: 2016-06-25 12:05
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Rollershutter
ha_release: 0.23
ha_iot_class: "Local Push"
---


The `homematic` rollershutter platform lets you control [Homematic](http://www.homematic.com/) rollershutters through Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
rollershutter:
  platform: homematic
  address: LEQ1234567
  name: Kitchen
```

Configuration variables:

- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.
