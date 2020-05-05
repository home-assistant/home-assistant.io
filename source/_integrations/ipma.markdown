---
title: Instituto Português do Mar e Atmosfera (IPMA)
description: Instructions on how to integrate Instituto Português do Mar e Atmosfera weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
  - '@abmantis'
ha_domain: ipma
---

The `ipma` weather platform uses the [Instituto Português do Mar e Atmosfera](https://www.ipma.pt/) as a source for current and forecast meteorological data.

## Configuration

To add the IPMA weather platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: ipma
```

{% configuration %}
name:
  description:  The name you would like to give to the weather station.
  required: false
  type: string
  default: The name of the used station
latitude:
  description: Latitude of the location for which you want weather information.
  required: false
  type: string
  default: Home Assistant global latitude configuration
longitude:
  description: Longitude of the location for which you want weather information.
  required: false
  type: string
  default: Home Assistant global longitude configuration
mode:
  description: "The forecast type. Can be `hourly` or `daily`."
  required: false
  type: string
  default: "`daily`"
{% endconfiguration %}
