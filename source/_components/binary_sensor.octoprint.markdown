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

The `octoprint` sensor platform let you monitor various states of your 3D printer and its print jobs.

<p class='note'>
You must have the [OctoPrint component](/components/octoprint/) configured to use this binary sensor. After configuring that component, binary sensors automatically appear.
</p>
<<<<<<< HEAD
=======

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
>>>>>>> current
