---
title: EHEIM Digital
description: Instructions on how to set up EHEIM Digital with Home Assistant.
ha_category:
  - Light
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: eheimdigital
ha_integration_type: hub
ha_platforms:
  - light
---

The **EHEIM Digital** {% term integration %} allows you to control your [EHEIM Digital](https://eheim.com/en_GB/aquatics/eheim-digital/) smart aquarium devices from Home Assistant.

{% include integrations/config_flow.md %}

## Supported devices

Currently, the following devices and features are supported:

- EHEIM classicLEDcontrol+e
  - Controlling the light of channel 0 and 1
  - Enabling daycyle mode
