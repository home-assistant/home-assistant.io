---
title: "SolarEdge Local Sensor"
description: "Instructions on how to integrate SolarEdge sensor within Home Assistant via Local API."
logo: solaredge.png
ha_category:
  - Sensor
  - Energy
ha_release: 0.95
ha_iot_class: Local Polling
---

The `solaredge_local` platform uses the local API available on some SolarEdge Inverters to allow you to get details from your SolarEdge solar power setup and integrate these into your Home Assistant installation.

Only specific models support the local API. The local API is available on inverters that do not have a lcd character screen. You can also  check the datasheets if in the section "Additional Features", sub-section "Inverter Commissioning" is present the following line "With the SetApp mobile application using built-in Wi-Fi access point for local connection".

You can check by finding the IP address of your inverter and visiting it in a browser. If it supports the local API, you'll see a HTML page with the SolarEdge logo and a "Commissioning" menu. If your inveter does not support the local API, you can use the [cloud based version](https://www.home-assistant.io/integrations/solaredge/)

<div class='note'>
SolarEdge has disabled the local polling functionality on newer software versions. The last known software version is: 4.5.41 You can check your software version in the 
</div>


## Configuration

To use the SolarEdge sensors in your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge_local
    ip_address: IP_ADDRES
```

{% configuration %}
ip_address:
  description: The IP Address of your SolarEdge inverter.
  required: true
  type: string
name:
  description: Let you overwrite the name of the device in the frontend.
  required: false
  default: SolarEdge
  type: string
{% endconfiguration %}

### Full configuration sample

A full configuration entry would look like the sample below.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge_local
    name: SolarEdge
    ip_address: 192.168.1.123
```

In case you would like to convert the values for example to kWh instead of the default Wh, you can use the [template platform](/integrations/template).

{% raw %}
```yaml
# Example configuration.yaml entry for sensor template platform
sensor:
  - platform: template
    sensors:
      solaredge_energy_this_year_template:
        value_template: "{{ (states('sensor.solaredge_energy_this_year') | float / 1000) | round(2) }}"
```
{% endraw %}
