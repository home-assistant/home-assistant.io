---
title: SwitchBee
description: Instructions for how to integrate Electra Air Conditioners within Home Assistant.
ha_category:
  - Climate
ha_release: 2022.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jafar-atili'
ha_domain: electrasmart
ha_platforms:
  - climate

ha_integration_type: integration
---

[Electra Air](https://www.electra-air.co.il), is a company which manufactures and sell Air Conditioners.

In order to setup this integration, you must have access to the phone number used and registered in the Electra Smart mobile app.

Air Conditioners configured in your Electra Smart mobile app will be discovered by Home Assistant after the Electra Smart integration is configured.

{% include integrations/config_flow.md %}
