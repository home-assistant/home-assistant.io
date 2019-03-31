---
layout: page
title: "Solax Sensor"
description: "Instructions on how to integrate Solax sensor within Home Assistant."
date: 2019-03-31 04:20
sidebar: true
comments: false
sharing: true
footer: true
logo: solax-logo.png
ha_category: Sensor
ha_release: 0.91
ha_iot_class: Local Polling
---

The `solax` component connects home-assistant to Solax solar power inverters. Solax inverters may be connected to a home Wi-Fi network and expose a REST API. This component retrieves information such as photovoltaic power production, battery levels and power, and how much power is being fed back into the grid.

## {% linkable_title Configuration %}

To use the Solax sensors in your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solax
    ip_address: IP_ADDRESS
```

{% configuration %}
ip_address:
  description: The IP address of your Solax system.
  required: true
  type: string
{% endconfiguration %}


### {% linkable_title Full configuration sample %}

A full configuration entry would look like the sample below.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solax
    ip_address: 192.168.0.3
```

If you would like to convert the values from multiple panels or view the total power the house is using, you can use the [template platform](/components/sensor.template/).

{% raw %}
```yaml
# Example configuration.yaml entry for template platform
sensors:
- platform: template
  sensors:
    total_pv_power:
      friendly_name: "Total PV Power"
      unit_of_measurement: 'W'
      value_template: "{{ (states('sensor.pv1_power') | float) + (states('sensor.pv2_power') | float) }}"
    load_power:
      friendly_name: "Load Power"
      unit_of_measurement: 'W'
      value_template: "{{ (states('sensor.power_now') | float) - (states('sensor.exported_power') | float) }}"
```
{% endraw %}
