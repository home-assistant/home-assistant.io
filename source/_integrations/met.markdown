---
title: Meteorologisk institutt (Met.no)
description: Instructions on how to integrate Met.no within Home Assistant.
logo: metno.png
ha_category:
  - Weather
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
---

The `met` platform uses the [Met.no](https://met.no/) web service as a source for meteorological data for your location. The weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.

<div class='note warning'>
  Configuration of the Met.no platform via configuration.yaml is deprecated from version 0.95 
</div>

## Configuration

To add Met.no to your installation, go to Configuration >> Integrations in the UI and enable the Met.no integration. By default the values will be taken from the Home Assistant configuration.

{% configuration %}
name:
  description: Manually specify Name.
  required: true
  type: string
  default: Provided by Home Assistant configuration
latitude:
  description: Manually specify latitude.
  required: true
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude.
  required: true
  type: float
  default: Provided by Home Assistant configuration
altitude:
  description: Manually specify altitude.
  required: false
  type: integer
  default: Provided by Home Assistant configuration
{% endconfiguration %}
