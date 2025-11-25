---
title: Airly
description: Instructions on how to integrate Airly within Home Assistant.
ha_category:
  - Health
ha_release: 0.101
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: airly
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Airly** {% term integration %} uses the [Airly](https://airly.eu/) web service as a source for air quality data for your location.

## Setup

To generate an Airly API key, go to [Airly for developers](https://developer.airly.eu/register) page.

{% include integrations/config_flow.md %}

{% note %}
Airly allows 100 data updates per day. For this reason, the more Airly instances
configured, the less frequent updates will be. For one configured Airly instance,
data will be updated every 15 minutes, for two configured instances, data will
be updated every 30 minutes, for three configured instances, data will be 
updated every 45 minutes, etc.
{% endnote %}
