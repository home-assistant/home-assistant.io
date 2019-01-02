---
layout: page
title: "Energy Sensor"
description: "Instructions on how to integrate Energy Sensor into Home Assistant."
date: 2019-01-02
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Energy 
ha_release: 0.85
ha_iot_class: "Local Push"
logo: energy_meter.png
ha_qa_scale: internal
---

The `energy` platform provides energy consumption values (in kWh) from devices that provide only power readings in W or kW.

The `energy` platform assumes a constant rate (power) over a period of time and therefore calculates the integral of the power values in W or kW provided by a **source** sensor as a function of time.

An `energy` sensor is quite useful in billing scenarios, since energy is generally billed in kWh.

## {% linkable_title Configuration %}

To enable Energy Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: energy 
    source: sensor.current_power
    name: "energy consumed"
    round: 2
```

{% configuration %}
source:
  description: The entity ID of the sensor providing power readings (must provide values in W or kW).
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
round:
  description: Round the calculated energy value to at most N decimal places.
  required: false
  type: integer
{% endconfiguration %}
