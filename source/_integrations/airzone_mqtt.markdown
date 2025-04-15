---
title: Airzone MQTT
description: Instructions on how to integrate Airzone MQTT within Home Assistant.
ha_release: 2025.5
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: airzone_mqtt
ha_platforms:
  - sensor
ha_codeowners:
  - '@Noltari'
ha_integration_type: integration
---

The **Airzone MQTT** {% term integration %} interacts with the MQTT API of [Airzone HVAC zoning systems](https://www.airzone.es/en/).

A typical Airzone device has a *parent zone* (Master Thermostat) per <abbr title="heating, ventilation, and air conditioning">HVAC</abbr> system, which is the only zone where the HVAC mode can be changed. The rest are *child zones* which can only enable or disable the <abbr title="heating, ventilation, and air conditioning">HVAC</abbr> and adjust the desired temperature on that specific zone.

Note that multiple <abbr title="Heating, ventilation, and air conditioning">HVAC</abbr> systems can be connected to the same Airzone WebServer. In this case, there will be a *parent zone* per HVAC system and there may also be *child zones* for each HVAC system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
MQTT Topic:
  description: "MQTT Topic ID configured via Airzone Cloud app"
{% endconfiguration_basic %}

## Sensors

For each Airzone Zone (thermostat), the following *sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| humidity            | Current zone relative humidity.    |
| hvac_mode           | Current zone HVAC mode.            |
| hvac_setpoint       | Current zone HVAC setpoint.        |
| hvac_setpoint_max   | Current zone HVAC maximum setpoint.    |
| hvac_setpoint_min   | Current zone HVAC minimum setpoint.    |
| temperature         | Current zone temperature.          |

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
