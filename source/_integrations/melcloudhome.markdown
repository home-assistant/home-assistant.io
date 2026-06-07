---
title: MELCloud Home
description: Instructions on how to integrate MELCloud Home with Home Assistant.
ha_category:
  - Climate
ha_release: '2026.7'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: melcloudhome
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **MELCloud Home** {% term integration %} connects Home Assistant to [MELCloud Home](https://www.melcloudhome.com/), Mitsubishi Electric's cloud service for managing their air conditioning and heat pump products.

{% include integrations/config_flow.md %}

## Prerequisites

You need an active MELCloud Home account with at least one registered unit. Use the same email address and password as the MELCloud Home app.

## Supported functionality

{% note %}
The integration is newly released in Home Assistant and will gradually expand its features and functionality.
{% endnote %}

The integration creates one climate entity per unit or zone:

### Air-to-Air (ATA) units

Each air conditioner or heat pump indoor unit is exposed as a climate entity with the following capabilities (availability depends on the physical unit):

- **HVAC modes**: Off, Heat, Cool, Auto, Dry, Fan only
- **Fan speed**: Auto, Speed 1–5 (dynamically added based on your unit)
- **Vertical vane**: Auto, Swing, Position 1–5
- **Horizontal vane**: Auto, Swing, Left, Left centre, Centre, Right centre, Right
- **Target temperature**
- **Current room temperature**

### Air-to-Water (ATW) units

Each heating zone of an air-to-water heat pump is exposed as a separate climate entity. Zone 2 is only created when the unit reports zone 2 support.

- **HVAC modes**: Off, Heat, Cool (if supported by the unit)
- **Target temperature** (per zone)
- **Current room temperature** (per zone)

## Data updates

The integration polls the MELCloud Home API every 60 seconds.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
