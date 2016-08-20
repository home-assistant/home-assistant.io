---
layout: page
title: "KNX Sensor"
description: "Instructions on how to use the KNX Sensor with Home Assistant."
date: 2016-08-20 22:24
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: DIY
ha_release: 0.24
---

[KNX/EIB](http://www.knx.org) integration for Home Assistant allows you to connect to a KNX bus. The component requires a local KNX/IP interface like the [Weinzierl 730](http://www.weinzierl.de/index.php/en/all-knx/knx-devices-en/knx-ip-interface-730-en). Through this it will send and receive commands to and from other devices to the KNX bus.

There is currently support for the following KNX Data Point Types

 - Temperature: KNX Datapoint Type 9.001 - °C - 2 Byte Float
 - Speed(Wind Speed): KNX Datapoint Type 9.005 - m/s - 2 Byte Float
 - Illuminance(Lux): KNX Datapoint Type 9.004 - Lux - 2 Byte Float

The `knx` Component muste be Configured Correctly, see (

A `knx` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
sensor:
  - platform: knx
    name: knxweather_temp
    type: temperature
    address: 1/0/3

  - platform: knx
    name: knxweather_wind
    type: speed_ms
    address: 1/0/0

  - platform: knx
    name: knxweather_lux
    type: illuminance
    address: 1/0/1
```
