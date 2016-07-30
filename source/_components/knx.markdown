---
layout: page
title: "KNX"
description: "Instructions on how to integrate KXN components with Home Assistant."
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

- [Binary Sensor](/components/binary_sensor.knx) 
- [Switch](/components/switch.knx)
- [Thermostat](/components/thermostat.knx)

A `knx` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
knx:
  host: IP_ADDRESS
  port: PORT
```

- **host** (*Required*): The IP address of the KNX/IP interface to use. You can use "0.0.0.0" if your KNX/IP gateway supports discovery.
- **port** (*Optional*): The UDP port number. Defaults to `3671`.
