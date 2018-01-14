---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Daikin AC(s) with Home Assistant."
date: 2017-12-03 05:00
sidebar: false
comments: false
sharing: true
footer: true
logo: N/A
ha_category: Climate
ha_release: 0.59
ha_iot_class: "Local Polling"
---

### Description ###

The sensor component integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:
- **inside temperature**
- **outside temperature**

<p class='note warning'>
    Please note, the `daikin` platform integrates **ONLY the european versions of Daikin ACs (models BRP069A41, 42, 43, 45)** into Home Assistant
</p>

### Configuration ###

Manual configuration and customization is possible by using the sample configuration from below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: daikin
      host: 10.0.0.1
      name: optional name
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
  detault: All conditions
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
