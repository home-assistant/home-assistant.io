---
title: SolarEdge Local
description: Instructions on how to integrate SolarEdge sensor within Home Assistant via Local API.
ha_category:
  - Sensor
  - Energy
ha_release: 0.95
ha_iot_class: Local Polling
ha_codeowners:
  - '@drobtravels'
  - '@scheric'
ha_domain: solaredge_local
ha_platforms:
  - sensor
---

The `solaredge_local` platform uses the local API available on some SolarEdge Inverters to allow you to get details from your SolarEdge solar power setup and integrate these into your Home Assistant installation.

Only specific models support the local API. The local API is available on inverters that do not have an LCD character screen. You can also  check the datasheets if in the section "Additional Features", sub-section "Inverter Commissioning" is present the following line "With the SetApp mobile application using built-in Wi-Fi access point for local connection". These inverters also have a part number that ends with a 4. For example: SEXXK-XXXXXBXX4 or SEXXXXH-XXXXXBXX4

You can check if the local API works by finding the IP address of your inverter and visiting it in a browser. If it supports the local API, you'll see a HTML page with the SolarEdge logo and a "Commissioning" menu. 

<div class='note'>

Recent firmware updates have disabled the local API on many inverters. Please enter the IP address of your inverter in a browser before attempting to use this component. If the local API is enabled, you'll see a web page with the SolarEdge logo and a "Commissioning" menu. See [this issue](https://github.com/jbuehl/solaredge/issues/124) and [this issue](https://github.com/drobtravels/solaredge-local/issues/24) for additional details.
  
If your inverter does not support the local API, you can use the [cloud based version](/integrations/solaredge/)

</div>

## Configuration

To use the SolarEdge sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solaredge_local
    ip_address: IP_ADDRESS
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
        unit_of_measurement: "KWh"
        icon_template: "mdi:solar-power"
```

{% endraw %}
