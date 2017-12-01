---
layout: page
title: "ADS"
description: "Connect Home Assistant to TwinCAT devices via the ADS interface."
date: 2016-05-25 23:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Hub
ha_release: 0.59
ha_iot_class: "Local Push"
---

The ADS (automation device specification) describes a device-independent and
fieldbus-independent interface for communication between Beckhoff® automation
devices running TwinCAT® and other devices implementing this interface.

Configuration parameters:

{% configuration %}

- **device** (*Required*): The AMS NetId that identifies the device.
- **port** (*Required*): The port that runs the AMS server on the device.
- **ip_address** (*Optional*): The IP-Address to which the Ams NetId is routed.
If None is given the first 4 bytes of the device id will be used.

{% endconfiguration %}


```yaml
# Example configuration.yaml entry
ads:
  device: '127.0.0.1.1.1'
  port: 48898
```

## Service

The ADS component will register the service `write_by_name` allowing you to
write a value to a variable on your ADS device.

```json
{
    "adsvar": ".myvariable",
    "adstype": "int",
    "value": 123
}
```

Service parameters:

- **adsvar**: name of the variable on the ADS device. To access global variables
on *TwinCAT2* use a prepending dot `.myvariable`, for TwinCAT3 use
`GBL.myvariable`
- **adstype**: specify the type of the variable. Use one of the following:
`int`, `byte`, `uint`, `bool`
- **value**: the value that will be written in the variable

