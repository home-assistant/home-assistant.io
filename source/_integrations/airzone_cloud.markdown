---
title: Airzone Cloud
description: Instructions on how to integrate Airzone Cloud within Home Assistant.
ha_release: 2023.6
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: airzone_cloud
ha_platforms:
  - sensor
ha_codeowners:
  - '@Noltari'
ha_integration_type: integration
---

This integration interacts with the Cloud API of [Airzone HVAC zoning systems](https://www.airzone.es/en/).

A typical Airzone device has a *parent zone* (Master Thermostat) per HVAC system, which is the only zone where the HVAC mode can be changed. The rest are *child zones* which can only enable or disable the HVAC and adjust the desired temperature on that specific zone.

Note that multiple HVAC systems can be connected to the same Airzone WebServer. In this case, there will be a *parent zone* per HVAC system and there may also be *child zones* for each HVAC system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Cloud API username"
Password:
  description: "Cloud API Password"
{% endconfiguration_basic %}

## Sensors

For each Airzone zone (Thermostat), the following *sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| humidity            | Current zone relative humidity.    |
| temperature         | Current zone temperature.          |
