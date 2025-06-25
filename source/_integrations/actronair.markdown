---
title: ActronAir
description: Integrates ActronAir Neo A/C controllers with Home Assistant.
ha_category:
  - Climate
  - Select
ha_release: 0.0.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@JagadishDhanamjayam'
ha_domain: actronair
ha_platforms:
  - climate
ha_integration_type: integration
---

The **ActronAir** {% term integration %} allows you to control [ActronAir Neo](https://actronair.com.au/products/residential/residential-controls/neo/) air conditioning systems in Home Assistant.

## Configuration

The premium wall-mounted touchscreen control system [NEO](https://actronair.com.au/products/residential/residential-controls/neo/) must be configured with a user account and connected to the cloud.

This integration is configured via the Home Assistant UI. No YAML configuration is needed. Enter your ActronAir credentials on the **Integrations** page in Home Assistant.

{% include integrations/config_flow.md %}

## Entities

If a user has multiple A/C systems associated with their account, each zone and wall controller is treated as an individual climate device.

### Climate

The integration creates a climate entity for the master controller and each zone.

- The **master controller** allows changes to A/C mode, fan speed, and the master temperature set point.
- Each **zone controller** can be turned ON or OFF. If a zone sensor or controller is available, the temperature set point can also be adjusted.
