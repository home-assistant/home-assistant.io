---
layout: page
title: "IHC Binary Sensor"
description: "Instructions how to integrate IHC Binary Sensors within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Binary Sensor
ha_release: 0.59
ha_iot_class: "Local Push"
---

Before you can use the IHC Binary Sensor platform, you must setup the [IHC Component](../ihc/)

When auto setup is enabled the following products will be found in the IHC project and setup as binary sensors:

* Dataline magnet contacts
* Dataline Pir sensors
* Dataline Pir sensors with twilight detection
* Dataline Pir alarm sensor
* Dataline smoke detector
* Dataline gas detector
* Dataline light sensor

To manually configure IHC Binary Sensors insert this section in your configuration:

```yaml
binary_sensor:
  - platform: ihc
    binary_sensors:
      - id: 12345
        name: mysensor
        type: opening
        inverting: True
      - id: 12346
           ...
```

Configuration variables:
- **binary_sensors** (*Optional*): List of binary sensors to setup manually.
- **id** (*Required*): The IHC resource id.
- **inverting** (*Optional*): If True the sensor will be inverted. Default False.
- **name** (*Optional*): The name of the component.
- **type** (*Optional*): The binary sensor type. See [Home Assistant binary sensor](../binary_sensor/) for available types.

The resource id should be an id of a boolean IHC resource.
For more information about IHC resource ids see [Manual Setup](../ihc/#manualy-setup)

