---
layout: page
title: "PVOutput Sensor"
description: "Instructions how to use PVOutput within Home Assistant."
date: 2016-11-06 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pvoutput.png
ha_category: Energy
ha_release: 0.33
ha_iot_class: "Cloud Polling"
---


The `pvoutput` sensor platform consumes information from [PVOutput](http://pvoutput.org/) which were uploaded by your solar photovoltaic (PV) system. 

To add PVOutput details to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pvoutput
    system_id: YOUR_SYSTEM_ID
    api_key: YOUR_API_KEY
    scan_interval: 120
```

Configuration variables:

- **api_key** (*Required*): Your API key. A read-only key is fine.
- **system_id** (*Required*): The ID of your station.

<p class='note warning'>
It's recommended to set `scan_interval:` according to a value greater than 60 seconds. The service only allows 60 requests per hour but the sensor's default is 30 seconds.
</p>

To format the PVoutput sensor it's recommended to use the [template component](/topics/templating/). For example:

```yaml
sensor:
  - platform: pvoutput
    system_id: YOUR_SYSTEM_ID
    api_key: YOUR_API_KEY
    scan_interval: 150
  - platform: template
    sensors:
      power_consumption:
        value_template: {% raw %}'{% if is_state_attr("sensor.pvoutput", "power_consumption", "NaN") %}0{% else %}{{ states.sensor.pvoutput.attributes.power_consumption }}{% endif %}'{% endraw %}
        friendly_name: 'Using'
        unit_of_measurement: 'Watt'
      energy_consumption:
        value_template: {% raw %}'{{ "%0.1f"|format(states.sensor.pvoutput.attributes.energy_consumption|float/1000) }}'{% endraw %}
        friendly_name: 'Used'
        unit_of_measurement: 'kWh'
      power_generation:
        value_template: {% raw %}'{% if is_state_attr("sensor.pvoutput", "power_generation", "NaN") %}0{% else %}{{ states.sensor.pvoutput.attributes.power_generation }}{% endif %}'{% endraw %}
        friendly_name: 'Generating'
        unit_of_measurement: 'Watt'
      energy_generation:
        value_template: {% raw %}'{% if is_state_attr("sensor.pvoutput", "energy_generation", "NaN") %}0{% else %}{{ "%0.2f"|format(states.sensor.pvoutput.attributes.energy_generation|float/1000) }}{% endif %}'{% endraw %}
        friendly_name: 'Generated'
        unit_of_measurement: 'kWh'
```
