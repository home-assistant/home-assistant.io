---
title: "Airly"
description: "Instructions on how to integrate Airly within Home Assistant."
logo: airly.png
ha_category:
  - Health
ha_release: 0.99
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.airly/
---

The `Airly` integration uses the [Airly](https://airly.eu/) web service as a source for air quality data for your location. To generate Airly API key go to [Airly for developers](https://developer.airly.eu/register) page.

## Configuration

To add Airly to your installation, go to Configuration >> Integrations in the UI and enable the Airly integration. By default the values will be taken from the Home Assistant configuration.

{% configuration %}
name:
  description: Manually specify Name.
  required: true
  type: string
  default: Airly
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
api_key:
  description: Airly API key.
  required: false
  type: string
{% endconfiguration %}
