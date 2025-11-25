---
title: SolaX Power
description: Instructions on how to integrate Solax sensor within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.94
ha_iot_class: Local Polling
ha_codeowners:
  - '@squishykid'
  - '@Darsstar'
ha_domain: solax
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The `solax` integration connects Home Assistant to Solax solar power inverters. Solax inverters may be connected to a home Wi-Fi network and expose a REST API. This integration retrieves information such as photovoltaic power production, battery levels and power, and how much power is being fed back into the grid.

{% include integrations/config_flow.md %}

### Optional template sensor

If you would like to convert the values from multiple panels or view the total power the house is using, you can use the [template platform](/integrations/template).

{% raw %}

```yaml
# Example configuration.yaml entry for template platform
template:
- sensor
  - name: Total PV power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.pv1_power') | float(default=0)) + (states('sensor.pv2_power') | float(default=0)) }}"
  - name: Load power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.power_now') | float(default=0)) - (states('sensor.exported_power') | float(default=0)) }}"
```

{% endraw %}

### Configuring the Energy Dashboard

There are generally at least 3 sensors from your inverter that you need to configure in the energy dashboard:

- The consumption sensor (in kWh) for the **Grid Consumption**.
- The feed-in sensor (in kWh) for the **Return to grid**, for example, the solar panel energy you do not consume and return to the grid instead.
- The on-grid yield sensor (in kWh) for the **Solar production**.
