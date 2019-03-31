# ha-solax
---
layout: page
title: "Solax Sensor"
description: "Instructions on how to integrate Solax sensor within Home Assistant."
date: 2019-03-31 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: solax-logo.png
ha_category: Sensor
ha_release: 0.91
ha_iot_class: Local Polling
---

The `solax` platform uses the [ha-solax](https://github.com/squishykid/ha-solax) API to allow you to get details from your Solax solar power setup and integrate these in your Home Assistant installation.

## {% linkable_title Configuration %}

To use the Solax sensors in your installation, add the following to your configuration.yaml file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: solax
    ip_address: IP_ADDRESS
```
{% endraw %}
{% configuration %}
### CONFIGURATION VARIABLES
ip_address:
  description: The IP address of your Solax system.
  required: true
  type: string
{% endconfiguration %}


### {% linkable_title Full configuration sample %}

{% raw %}
A full configuration entry would look like the sample below.


```yaml
# Example configuration.yaml entry
sensor:
  - platform: solax
    ip_address: 192.168.0.3
```
{% endraw %}

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
