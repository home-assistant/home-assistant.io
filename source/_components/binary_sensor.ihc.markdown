---
layout: page
title: "IHC Binary Sensor"
description: "Instructions on how to integrate IHC Binary Sensors within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Binary Sensor
ha_release: 0.62
ha_iot_class: "Local Push"
---

Before you can use the IHC Binary Sensor platform,
you must setup the [IHC Component](/components/ihc/).

When auto setup is enabled the following products will
be found in the IHC project and setup as binary sensors:

- Dataline magnet contacts
- Dataline Pir sensors
- Dataline Pir sensors with twilight detection
- Dataline Pir alarm sensor
- Dataline smoke detector
- Dataline gas detector
- Dataline light sensor

## {% linkable_title Manual configuration %}

To manually configure IHC Binary Sensors insert the "binary_sensor" section in your IHC configuration:

```yaml
# Example configuration.yaml entry
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    info: true
    binary_sensor:
      - id: 12345
        name: switch_front_door
        inverting: false
        note: Magnet contact
        position: Switch in door
        type: door
```

{% configuration %}
binary_sensor:
  description: List of binary sensors to setup manually.
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: integer
    inverting:
      description: If True the sensor will be inverted.
      required: false
      type: boolean
      default: false
    name:
      description: The name of the sensor.
      required: false
      type: string
    type:
      description: >
        The binary sensor type.
        See [Home Assistant binary sensor](/components/binary_sensor/)
        for available types.
      required: false
      type: string
    note:
      description: Descriptive note
      required: false
      type: string
    position:
      description: Where is it placed
      required: false
      type: string
{% endconfiguration %}

The resource id should be an id of a boolean IHC resource. For more information
about IHC resource ids see [Manual Setup](/components/ihc/#manual-setup).
