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
    name: YOUR_OCTOPRINT_NAME
    monitored_conditions:
      - Printing
      - Printing Error
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: true
  type: string
  default: Octoprint
monitored_conditions:
  description: Conditions to monitor.
  required: true
  type: list
{% endconfiguration %}

Configuration variables:
- **name** (*Required*): The name of the sensor. This needs to match a name under the Octoprint platform configuration.
- **monitored_conditions** array (*Required*): States to monitor.
  - **Printing**: State of the printer.
  - **Printing Error**: Error while printing.
