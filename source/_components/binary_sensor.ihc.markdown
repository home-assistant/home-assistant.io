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

To configure IHC Binary Sensors insert this section in your configuration:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ihc
    auto_setup: True
```

When autosetup is enabled the following products will be found in the ihc project:

* Dataline magnet contacts
* Dataline Pir sensors
* Dataline Pir sensors with twilight detection
* Dataline Pir alarm sensor
* Dataline smoke detector
* Dataline gas detector
* Dataline light sensor

If you want to add something manually do it like this:

```yaml
binary_sensor:
  - platform: ihc
    auto_setup: True
    binary_sensors:
      - id: 12345: 
        name: mysensor
        type: opening
        inverting: True
      - id: 12346
           ...
```

Configuration variables:
- **auto_setup** (*Optional*): True to have IHC products auto setup.
- **binary_sensors** (*Optional*): List of binary sensors to setup manually.
- **id** (*Required*): The IHC resource id.
- **inverting** (*Optional*): If True the sensor will be inverted. Default False.
- **name** (*Optional*): The name of the component.
- **type** (*Optional*): The binary sensor type. See [Home Assistant binary sensor](../binary_sensor/) for available types.

The resource id should be an id of a boolean resource.
For more information about ihc resource ids see [Manual Setup](../ihc#manualy-setup)

