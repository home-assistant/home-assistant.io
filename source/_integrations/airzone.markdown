---
title: Airzone
description: Instructions on how to integrate Airzone within Home Assistant.
ha_release: 2022.4
ha_category:
  - Binary Sensor
  - Climate
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: airzone
ha_platforms:
  - binary_sensor
  - climate
  - sensor
---

This integration allows getting values from the local API of Airzone HVAC zoning systems.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate
- Sensor

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Network IP address"
Port:
  description: "Network port"
{% endconfiguration_basic %}

Temperature and humidity sensors and air demand, floor demand, and problems binary sensors for each HVAC zone are created, as well as their corresponding climate entities.
