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
  - select  
ha_integration_type: integration
---

The **ActronAir** {% term integration %} allows you to control [ActronAir Neo](https://actronair.com.au/products/residential/residential-controls/neo/) Air Conditioning controllers into Home Assistant.

## Prerequisites

The premium wall-mounted touchscreen control system [NEO](https://actronair.com.au/products/residential/residential-controls/neo/),must be configured with a user account and connected to the cloud. The user credentails should be entered on the integrations page in Home Assistant.

{% include integrations/config_flow.md %}

## Entities

### Select

If a user has multiple A/C systems associated to their account, all of them are listed with their names and serial numbers. 
User has an option to choose from the list. The first system is chosen by default to start with.

### Climate

The integration creats a climate entity for the master controller as well as each of the zones.
Based on the zone capability such as temperature-controlled, controls are enabled for each of the enabled zones.

Master controller provides ability to change the AC Mode and Fan Speed besides master temperature set point.
Zone controller provides ability to turn ON/OFF a zone. Depending on the availability of zone sensor/controller, option to change the set point temperature is provided.

