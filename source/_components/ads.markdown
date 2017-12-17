---
layout: page
title: "ADS"
description: Connect Home Assistant to TwinCAT devices via the ADS interface
date: 2017-12-05 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category: Hub
ha_release: "0.60"
ha_iot_class: "Local Push"
---

The ADS (automation device specification) describes a device-independent and fieldbus independent interface for communication between [Beckhoff](https://www.beckhoff.com/) automation devices running [TwinCAT](http://www.beckhoff.hu/english.asp?twincat/default.htm) and other devices implementing this interface.

To enable ADS, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ads:
  device: '127.0.0.1.1.1'
  port: 48898
```

{% configuration %}
  device:
    required: true
    description: The AMS NetId that identifies the device.
    type: string
  port:
    required: true
    description: The port that runs the AMS server on the device, typically this would be 801 or 851.
    type: int
  ip_address:
    required: false
    description: The IP address of the ADS device, if not set the first 4 bytes of the device id will be used.
    type: string
{% endconfiguration %}

## {% linkable_title Service %}

The ADS component will register the service `write_by_name` allowing you to write a value to a variable on your ADS device.

```json
{
    "adsvar": ".myvariable",
    "adstype": "int",
    "value": 123
}
```

Service parameters:

- **adsvar**: Name of the variable on the ADS device. To access global variables on *TwinCAT2* use a prepending dot `.myvariable`, for TwinCAT3 use
`GBL.myvariable`.
- **adstype**: Specify the type of the variable. Use one of the following: `int`, `byte`, `uint`, `bool`
- **value**: The value that will be written in the variable.
