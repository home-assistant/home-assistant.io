---
title: ActronAir
description: Instructions on how to integrate ActronAir Neo A/C controller into Home Assistant.
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

The **ActronAir** {% term integration %} allows you to control [ActronAir Neo](https://actronair.com.au/products/residential/residential-controls/neo/) Air Conditioning in Home Assistant.

## Prerequisites

The premium wall-mounted touchscreen control system [NEO](https://actronair.com.au/products/residential/residential-controls/neo/),must be configured with a user account and connected to the cloud. The user credentials should be entered on the integrations page in Home Assistant.

{% include integrations/config_flow.md %}

## Entities

If a user has multiple A/C systems associated to their account, every zones and wall controller is treated as individual climate device.

### Climate

The integration creates a climate entity for the master controller as well as each of the zones.
Based on the zone capability such as temperature-controlled, controls are enabled for each of the enabled zones.

The master controller provides the ability to change the AC Mode, Fan Speed, and the master temperature set point.
The zone controller provides the ability to turn a zone ON/OFF. Depending on the availability of a zone sensor/controller, the option to change the set point temperature is provided.

