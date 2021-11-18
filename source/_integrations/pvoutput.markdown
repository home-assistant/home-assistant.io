---
title: PVOutput
description: Instructions on how to use PVOutput within Home Assistant.
ha_category:
  - Energy
ha_release: 0.33
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
ha_domain: pvoutput
ha_platforms:
  - sensor
---

The `pvoutput` sensor platform consumes information from [PVOutput](https://pvoutput.org/) which were uploaded by your solar photovoltaic (PV) system.

To add PVOutput details to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pvoutput
    system_id: YOUR_SYSTEM_ID
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your API key. A read-only key is fine.
  required: true
  type: string
system_id:
  description: The ID of your station.
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  default: PVOutput
  type: string
{% endconfiguration %}

To format the PVoutput sensor it's recommended to use the [template component](/topics/templating/). For example:

{% raw %}

```yaml
sensor:
  - platform: pvoutput
    system_id: YOUR_SYSTEM_ID
    api_key: YOUR_API_KEY
template:
  - sensor:
    - name: Power Consumption
      state: "{{ state_attr('sensor.pvoutput', 'power_consumption') | float(default=0) }}"
      unit_of_measurement: "W"
    - name: Energy Consumption
      state: "{{ '%0.1f' | format(state_attr('sensor.pvoutput', 'energy_consumption') | float(default=0) / 1000) }}"
      unit_of_measurement: "kWh"
    - name: Power Generation
      state: "{{ state_attr('sensor.pvoutput', 'power_generation') | float(default=0) }}"
      unit_of_measurement: "W"
    - name: Energy Generation
      state: "{{ '%0.2f' | format(state_attr('sensor.pvoutput', 'energy_generation') | float(default=0) / 1000) }}" 
      unit_of_measurement: "kWh"
```

{% endraw %}
