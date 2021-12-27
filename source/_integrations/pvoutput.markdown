---
title: PVOutput
description: Instructions on how to use PVOutput within Home Assistant.
ha_category:
  - Energy
ha_release: 0.33
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_config_flow: true
ha_domain: pvoutput
ha_platforms:
  - sensor
---

The PVOutput integration consumes information from [PVOutput](https://pvoutput.org/) which was uploaded by your solar photovoltaic (PV) system.

{% include integrations/config_flow.md %}

## Extracting data into separate sensors

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
