---
layout: page
title: "DTE Energy Bridge"
description: "Instructions how to setup DTE Energy Bridge with Home Assistant."
date: 2016-06-07 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: dte_energy.png
ha_category: Energy
ha_release: 0.21
ha_iot_class: "Local Polling"
---

A sensor platform for the [DTE](https://www.dteenergy.com/) Energy Bridge.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dte_energy_bridge
    ip: 192.168.1.11
```

Configuration variables:

- **ip** (*Required*): The IP address of your bridge.
- **name** (*Optional*): Name to use in the frontend.
