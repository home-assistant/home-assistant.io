---
title: Ambient Weather Station
description: How to integrate Ambient Weather station within Home Assistant.
ha_category:
  - Weather
ha_release: 0.85
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: ambient_station
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `Ambient Weather Station` integration retrieves local weather information
via personal weather stations from [Ambient Weather](https://ambientweather.net).

## Prerequisites

Using this integration requires both an Application Key and an API Key. To
generate both, simply utilize the profile section of
[your Ambient Weather dashboard](https://dashboard.ambientweather.net).

To add your Ambient Weather PWS to your Home Assistant installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ambient_station:
  api_key: YOUR_API_KEY
  app_key: YOUR_APPLICATION_KEY
```

{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
app_key:
  description: The Application key to access the service.
  required: true
  type: string
{% endconfiguration %}

{% include integrations/config_flow.md %}

## Local API Option

This integration communicates with Ambient Weather PWS units via the Ambient Weather
Cloud. Users desiring a local option are encouraged to explore the
[Ecowitt](https://www.ecowitt.com) family of devices, which are able to read RF signals
directly from the PWS and transmit them to a variety of other applications, including
[`ecowitt2mqtt`](https://github.com/bachya/ecowitt2mqtt) (which supports
[MQTT Discovery](/docs/mqtt/discovery)).
