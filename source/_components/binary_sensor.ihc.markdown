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

To manually configure IHC Binary Sensors
insert this section in your configuration:

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

{% configuration %}
binary_sensors:
  description: List of binary sensors to setup manually.
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: int
    inverting:
      description: If True the sensor will be inverted.
      required: false
      type: boolean
      default: false
    name:
      description: The name of the component
      required: false
      type: string
    type:
      description: >
        "The binary sensor type.
        See [Home Assistant binary sensor](/components/binary_sensor/)
        for available types."
      required: false
      type: string
{% endconfiguration %}

The resource id should be an id of a boolean IHC resource. For more information
about IHC resource ids see [Manual Setup](/components/ihc/#manual-setup).
