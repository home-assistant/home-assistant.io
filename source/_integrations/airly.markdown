---
title: Airly
description: Instructions on how to integrate Airly within Home Assistant.
logo: airly.png
ha_category:
  - Health
ha_release: 0.101
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
---

The `airly` integration uses the [Airly](https://airly.eu/) web service as a source for air quality data for your location. 

## Setup

To generate an Airly API key, go to [Airly for developers](https://developer.airly.eu/register) page.

## Configuration

To add Airly to your installation, go to **Configuration** >> **Integrations** in the UI and enable the Airly integration. By default, the values will be taken from the Home Assistant configuration.

{% configuration %}
api_key:
  description: The Airly API key.
  required: true
  type: string
name:
  description: Manually specify Name.
  required: false
  type: string
  default: Airly
latitude:
  description: Manually specify latitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
{% endconfiguration %}
