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
  - diagnostics
  - sensor
ha_codeowners:
  - '@Noltari'
ha_integration_type: integration
---

This integration interacts with the Local API of [Airzone HVAC zoning systems](https://www.airzone.es/en/).

A typical Airzone device has a *parent zone* (Master Thermostat) per HVAC system, which is the only zone where the HVAC mode can be changed. The rest are *child zones* which can only enable or disable the HVAC and adjust the desired temperature on that specific zone.

Note that multiple HVAC systems can be connected to the same Airzone WebServer. In this case, there will be a *parent zone* per HVAC system and there may also be *child zones* for each HVAC system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Network IP address"
Port:
  description: "Network port"
ID:
  description: "Airzone System ID (only needed if System ID 0 is not supported on your device)"
{% endconfiguration_basic %}

## Binary Sensors

For each Airzone system (HVAC machine), the following *binary sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| problems            | System has errors or warnings.     |

For each Airzone zone (Thermostat), the following *binary sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| air_demand          | HVAC is running.                   |
| battery_low         | Thermostat battery warning.        |
| floor_demand        | Radiating floor is running.        |
| problems            | Zone has errors or warnings.       |

## Climate

For each Airzone zone (Thermostat) a *climate entity* is created.

**HVAC mode can only be changed on a *parent zone*.**

*Slave zones* can only enable/disable the current HVAC mode selected on the corresponding *parent zone*. Attempting to change the HVAC mode on a *child zone* will result on a Home Assistant error.

## Sensors

For the Airzone WebServer, the following *sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| rssi                | WiFi RSSI.                         |

For each Airzone zone (Thermostat), the following *sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| humidity            | Current zone relative humidity.    |
| temperature         | Current zone temperature.          |
