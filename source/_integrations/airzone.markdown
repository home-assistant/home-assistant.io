---
title: Airzone
description: Instructions on how to integrate Airzone within Home Assistant.
ha_release: 2022.4
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: airzone
ha_platforms:
  - sensor
---

This integration allows getting values from the local API of Airzone HVAC zoning systems.

There is currently support for the following device types within Home Assistant:

- Sensor

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Network IP address"
Port:
  description: "Network port"
{% endconfiguration_basic %}

Only temperature and humidity sensors for each HVAC zone are supported right now.
It should also be possible to control the different HVAC zones with climate devices.
