---
title: Fresh-r
description: Instructions on how to integrate Fresh-R ventilation solutions within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.1.2
ha_iot_class: Cloud Polling
ha_domain: freshr
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@SierraNL'
---

The **Fresh-R** {% term integration %} uses the dashboard provided for the end user [Fresh-R.me](https://www.fresh-r.me/).

With this integration, it is possible to get information from all the Fresh-R devices connected to the account. The integration emulates the user flow in a minimal way and polls for data.

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- **[Sensor](#sensor)**

## Sensor

This integration provides the following sensors:

|Name|Description|
|----|-----------|
|Inside temperature|Temperature of the outgoing air in the unit in °C|
|Outside temperature|Temperature of the incoming air in the unit in °C|
|Inside CO2|CO2 in ppm|
|Inside Humidity|Humidity in %|
|Flow|Flow in m3/h|
|Dew Point|Dew point in °C|

{% note %}
Some systems support an air quality sensor, that is not yet supported.
{% endnote %}
