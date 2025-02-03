---
title: Actron Air Neo
description: Instructions on how to integrate the Actron Air Neo A/C controller into Home Assistant.
ha_category:
  - Climate
ha_release: 2025.03
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@kclif9"
ha_domain: actronair_neo
ha_platforms:
  - climate
ha_integration_type: integration
---

The **Actron Air Neo** {% term integration %} allows you to control [Actron Air](https://www.actronair.com.au/) Neo Air Conditioning controllers into Home Assistant.

## Prerequisites

You must have an Actron Air Air-Conditioner with the Neo tablet wall controller installed, and registered to an email address.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for the main air conditioning system found and for each zone. The main air conditioner unit will be reflected based on the name in the Actron Air Neo app. You can set the temperature, operation mode and fan speed through this entity. 

Each zone will be reflected as a separate climate entity.  You can set the temperature and operation mode per zone (if supported by your air conditioner).
