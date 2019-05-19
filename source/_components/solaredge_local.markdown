---
layout: page
title: "SolarEdge Local Sensor"
description: "Instructions on how to integrate SolarEdge sensor within Home Assistant via Local API."
date: 2018-12-04 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: solaredge.png
ha_category: Sensor
ha_release: 0.94
ha_iot_class: Local Polling
redirect_from:
 - /components/sensor.solaredge_local/
---

The `solaredge_local` platform uses the local API available on some SolarEdge Inveters to allow you to get details from your SolarEdge solar power setup and integrate these in your Home Assistant installation.


Only specific models support the local API.  The local API is available on the SExxxxH-US models with SetApp as well as European three phase inverters SEXXK-XXXTXBXX4 models with SetApp like SE3K-E10K, SE12.5K-SE27.6K and SE33.3K. Please check carefully the datasheets if in the section "Additional Features", sub-section "Inverter Commissioning" is present the following line "With the SetApp mobile application using built-in Wi-Fi access point for local connection".

You can check by finding the IP address of your inverter and visiting it in a browser. If it supports the local API, you'll see the SolarEdge logo and a "Commissioning" menu.

<p class='note'>
If your inveter does not support the local API, you can use the [cloud based version](/components/solaredge/) instead
</p>

## {% linkable_title Configuration %}

To use the SolarEdge sensors in your installation, add the following to your configuration.yaml file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  platform: solaredge_local
  ip_address: IP_ADDRESS
  monitored_conditions:
    - lifetime_energy
    - energy_this_year
    - energy_this_month
    - energy_today
    - current_power
```
{% endraw %}

{% configuration %}
ip_address:
  description: The IP Address of your SolarEdge inverter
  required: true
  type: string
name:
  description: Let you overwrite the name of the device in the frontend.
  required: false
  default: SolarEdge
  type: string
monitored_conditions:
  description: SolarEdge Site information to be monitored. The following conditions can be monitored.
  required: false
  type: list
  default: current_power
  keys:
    lifetime_energy:
      description: Lifetime energy generated at your SolarEdge Site in Wh
    energy_this_year:
      description: Energy generated this year at your SolarEdge Site in Wh
    energy_this_month:
      description: Energy generated this month at your SolarEdge Site in Wh
    energy_today:
      description: Energy generated today at your SolarEdge Site in Wh
    current_power:
      description: Current generated power in W

{% endconfiguration %}

If no **monitored_conditions** are specified, only **current_power** will be enabled.

### {% linkable_title Full configuration sample %}

A full configuration entry would look like the sample below.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge_local
    name: SolarEdge
    monitored_conditions:
      - current_power
      - energy_today
      - energy_this_month
      - energy_this_year
      - lifetime_energy
```
{% endraw %}

In case you would like to convert the values for example to kWh instead of the default Wh, you can use the [template platform](/components/sensor.template/).

{% raw %}
```yaml
# Example configuration.yaml entry for template platform
sensors:
  platform: template
  sensors:
    solaredge_energy_this_year_template:
      value_template: '{{(states.sensor.solaredge_energy_this_year.state | float / 1000) | round(2)}}'
```
{% endraw %}
