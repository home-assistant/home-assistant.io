---
title: Actron Air Neo
description: Instructions on how to integrate the Actron Air Neo A/C controller into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
ha_release: 2025.02
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kclif9'
ha_domain: actronair_neo
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - sensor
  - switch
ha_integration_type: integration
---

The **Actron Air Neo** {% term integration %} allows you to control [Actron Air](https://www.actronair.com.au/) Neo Air Conditioning controllers into Home Assistant.

## Prerequisites

You must have a Actron Air Air-Conditioner with the Neo tablet wall controller installed, and registered to an email address.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for the main air conditioning system found and for each zone.

### Sensor

The integration will create sensor entities for a variety of aspects:

- Diagnostic sensors are created to show the state of the compressor, speed, power and temperature settings.
- Each zone that is temperature-controlled will have a sensor to show the temperature.

### Binary sensor

The integration will create sensor entities for a variety of aspects:

- The clean filter binary sensor shows if the filter needs to be cleaned.
- The defrost mode binary sensor shows if the unit is in defrost mode.
- The system on binary sensor shows if the unit is turned on.

### Switch

The integration will create switch entities to toggle the continuous fan mode state.
