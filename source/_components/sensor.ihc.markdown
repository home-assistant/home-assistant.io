---
layout: page
title: "IHC Sensor"
description: "Instructions on how to integrate IHC Sensors within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Sensor
ha_release: 0.62
ha_iot_class: "Local Push"
---

Before you can use the IHC Sensor platform, you must setup the [IHC Component](/components/ihc/)

When auto setup is enabled the following products will be found in the IHC project and setup as sensors:

* Dataline temperature sensor - Will insert 2 temperature sensors
* Dataline Humidity - Will insert 1 humidity and 2 temperature sensors (calculated dewpoint)
* Dataline Lux - will insert 1 light and 1 temperature sensor

To manually configure IHC sensors insert this section:

```yaml
sensor:
  - platform: ihc
    sensors:
      - id: 12345
        name: 'mysensor'
        unit_of_measurement: '°C'
      - id: 12346
        ...
```

{% configuration %}
sensors:
  description: List of sensors to setup manually
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: int
    name:
      description: The name of the component
      required: false
      type: string
    unit_of_measurement:
      description: Defines the unit of measurement of the sensor, if any.
      required: false
      type: string
{% endconfiguration %}

The resource id should be a IHC float resource.
For more information about IHC resource ids see [Manual Setup](/components/ihc/#manual-setup)

