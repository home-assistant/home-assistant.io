---
layout: page
title: "KNX"
description: "Instructions on how to integrate KXN compoents with Home Assistant."
date: 2016-06-08 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: DIY
ha_release: 0.24
---

[KNX/EIB](http://www.knx.org) integration for Home Assistant allows you to connect to a KNX bus. The component requires a local KNX/IP interface like the [Weinzierl 730](http://www.weinzierl.de/index.php/en/all-knx/knx-devices-en/knx-ip-interface-730-en). Through this it will send and receive commands to and from other devices to the KNX bus.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.knx) 
- [Switch](../switch.knx) 

The local ZigBee device (assuming XBee) must have an up to date Router or Coordinator API firmware installed.

## Configuration

A `knx` section must be present in the `configuration.yaml` file and contain the following options as required:

- **host**: The IP address of the KNX/IP interface to use. You can use "0.0.0.0" if your KNX/IP gateway supports discovery

- **port**: The UDP port number. Default: `3671`

#### Example

```yaml
knx:
  host: 192.168.1.12
```
