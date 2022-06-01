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
ha_domain: solax
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The `solax` integration connects Home Assistant to Solax solar power inverters. Solax inverters may be connected to a home Wi-Fi network and expose a REST API. This integration retrieves information such as photovoltaic power production, battery levels and power, and how much power is being fed back into the grid.

## Configuration

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

### Note

Inverter models with newer firmware (and also those using devices like PocketWifi) no longer expose an API when connected to your wireless network, they do however continue to expose it on their own broadcasted SSID. To use this sensor in this case it is necessary to set up a reverse proxy with something like NGINX and use a Raspberry Pi (or similar) with two network connections (one being Wi-Fi that connects to the inverters SSID).


Example NGINX configuration

```text
location / {
  proxy_pass http://5.8.8.8;
}
```
