---
layout: page
title: "RFXtrx Sensor"
description: "Instructions how to integrate RFXtrx sensors into Home Assistant."
date: 2015-08-06 17:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

The `rfxtrx` platform support sensors that communicate in the frequency range of 433.92 MHz.

To enable RFXtrx sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor: 
 platform: rfxtrx
 automatic_add: True
 devices:
   sensor_0502:
     name: Lving
     packetid: 0a52080705020095220269
     data_type: Temperature
   sensor_0601:
     name: Bath_Humidity
     packetid: 0a520802060100ff0e0269
     data_type: Humidity
   sensor_0601 2:
     name: Bath
     packetid: 0a520802060100ff0e0269
```

Configuration variables:

- **devices**  (*Optional*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new lights.
- **data_type**  (*Optional*): Which data type the sensor should show
