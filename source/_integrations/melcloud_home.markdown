---
title: MELCloud Home
description: Instructions on how to integrate MELCloud Home with Home Assistant.
ha_category:
  - Climate
  - Sensor  
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: melcloud_home
ha_config_flow: true
ha_platforms:
  - climate
  - sensor  
ha_integration_type: hub
ha_quality_scale: bronze
---

The **MELCloud Home** {% term integration %} connects Home Assistant to [MELCloud Home](https://www.melcloudhome.com/), Mitsubishi Electric's cloud service for managing their air conditioning and heat pump products.

## Prerequisites

During setup of the integration, you will need the following information:

- The e-mail address you used to configure your MELCloud Home account
- The password associated with the MELCloud Home account

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The e-mail address you used to configure your MELCloud Home account."
Password:
    description: "The password associated with the MELCloud Home account."
{% endconfiguration_basic %}

## Supported functionality

The **MELCloud Home** {% term integration %} provides the following entities.

### Binary sensors

- **Error**: Indicates if the unit reported an error.
- **Standby**: Indicates if the unit is in standby mode.
- **Forced hot water**: Indicates if the force hot water is activated (applicable only for Air-to-Water units).
- **Frost protection**: Indicates if the prost protection, if enabled, is activated.
- **Overheat protection**: Indicates if the overheat protection, if enabled, is activated.

###  Climate

The integration creates one climate entity per unit or zone:

#### Air-to-Air (ATA) units

Each air conditioner or heat pump indoor unit is exposed as a climate entity with the following capabilities (availability depends on the physical unit):

- **HVAC modes**: Off, Heat, Cool, Auto, Dry, Fan only
- **Fan speed**: Auto, Speed 1–5 (dynamically added based on your unit)
- **Vertical vane**: Auto, Swing, Position 1–5
- **Horizontal vane**: Auto, Swing, Left, Left centre, Centre, Right centre, Right
- **Target temperature**
- **Current room temperature**

#### Air-to-Water (ATW) units

Each heating zone of an air-to-water heat pump is exposed as a separate climate entity. Zone 2 is only created when the unit reports zone 2 support.

- **HVAC modes**: Off, Heat, Cool (if supported by the unit)
- **Target temperature** (per zone)
- **Current room temperature** (per zone)

### Sensors

The following entities are created per unit or zone, both for Air-to-Air and Air-to-Water units:

- **Room temperature**: Returns the current measured room temperature.
- **RSSI**: The current WiFi signal strength.

The following extra sensors are only applicable for the Air-to-Water units:

- **Room zone temperature 1 & 2**: Either one or the two room temperatures are returned, if applicable for the setup.
- **Tank water temperature**: The current measured tank water temperature.

## Data updates

The integration {% term polling polls %} the MELCloud Home API every 60 seconds.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
