---
layout: page
title: "OctoPrint Binary Sensor"
description: "Instructions on how to integrate OctoPrint binary sensors within Home Assistant."
date: 2016-05-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: octoprint.png
ha_category: Binary Sensor
ha_release: 0.19
ha_iot_class: "Local Polling"
---


The `octoprint` binary sensor platform let you monitor if your 3D printer is printing or if there was a printing error.

<p class='note'>
You must have the [OctoPrint component](/components/octoprint/) configured to use this sensor.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: octoprint
    monitored_conditions:
      - Printing
      - Printing Error
```

{% configuration %}
monitored_conditions:
  description: States to monitor.
  required: true
  type: list
  keys:
    printing:
      description: State of the printer.
    printing error:
      description: Error while printing.
name:
  description:
  required: The name of the sensor.
  default: OctoPrint
  type: string
{% endconfiguration %}
