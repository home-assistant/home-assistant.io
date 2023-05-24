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

A typical Airzone HVAC system consists of a parent device (called *master* in Airzone terminology) and child devices (called *zones* in Airzone terminology). The [HVAC mode](https://www.home-assistant.io/integrations/climate/#service-climateset_hvac_mode) can only be changed on the parent device. On child devices (*zones*), you can only enable or disable the HVAC and adjust the desired temperature for that specific device.

Note that multiple HVAC systems can be connected to the same Airzone web server. In this case, there will be one *parent zone* per HVAC system and there may also be *child zones* for each HVAC system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Cloud API username"
Password:
  description: "Cloud API password"
{% endconfiguration_basic %}

## Sensors

For each Airzone zone (thermostat), the following *sensors* are created:

| Condition           | Description                                         |
| :------------------ | :-------------------------------------------------- |
| humidity            | Measures the relative humidity in the current zone. |
| temperature         | Measures the temperature  in the current zone.      |
