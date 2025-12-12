---
title: SolarEdge Local
description: Instructions on how to integrate SolarEdge sensor within Home Assistant via Local API.
ha_category:
  - Energy
  - Sensor
ha_release: 0.95
ha_iot_class: Local Polling
ha_codeowners:
  - '@drobtravels'
  - '@scheric'
ha_domain: solaredge_local
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `solaredge_local` {% term integration %} uses the local API available on some SolarEdge Inverters to allow you to get details from your SolarEdge solar power setup and integrate these into your Home Assistant installation.

Only specific models support the local API. The local API is available on inverters that do not have an LCD character screen. You can also  check the datasheets if in the section "Additional Features", sub-section "Inverter Commissioning" is present the following line "With the SetApp mobile application using built-in Wi-Fi access point for local connection". These inverters also have a part number that ends with a 4. For example: SEXXK-XXXXXBXX4 or SEXXXXH-XXXXXBXX4

You can check if the local API works by finding the IP address of your inverter and visiting it in a browser. If it supports the local API, you'll see an HTML page with the SolarEdge logo and a "Commissioning" menu. 

{% warning %}

Recent firmware updates have disabled the local API on many inverters. Please enter the IP address of your inverter in a browser before attempting to use this integration. If the local API is enabled, you'll see a web page with the SolarEdge logo and a "Commissioning" menu. See [this issue](https://github.com/jbuehl/solaredge/issues/124) and [this issue](https://github.com/drobtravels/solaredge-local/issues/24) for additional details.
  
If your inverter does not support the local API, you can use the [cloud based version](/integrations/solaredge/)

{% endwarning %}

## Configuration

To use the SolarEdge {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %}

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
