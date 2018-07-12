---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Daikin AC(s) with Home Assistant."
date: 2017-12-03 05:00
sidebar: True
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category: Sensor
ha_release: 0.59
ha_iot_class: "Local Polling"
---


The `daikin` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:

- **inside temperature**
- **outside temperature**

<p class='note warning'>
Please note, the `daikin` platform integrates **ONLY the european versions of Daikin ACs (models BRP069A41, 42, 43, 45)** into Home Assistant.
</p>

To enable the platform manually, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: daikin
    host: 10.0.0.1
    monitored_conditions:
      - inside_temperature
      - outside_temperature
```

{% configuration %}
host:
  description: IP or hostname of the device.
  required: true
  type: string
monitored_conditions:
  description: List of items you want to monitor for each device.
  required: false
  default: All conditions
  type: list
  keys:
    inside_temperature:
      description: The current temperature measured inside the house.
    outside_temperature:
      description: The current temperature measured outside the house.
{% endconfiguration %}

<p class='note warning'>
    Please note that some AC devices may report outside temperature only when they are turned on.
</p>
