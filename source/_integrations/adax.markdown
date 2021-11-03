---
title: Adax
description: Instructions on how to integrate Adax heater into Home Assistant.
ha_category:
  - Climate
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: adax
ha_config_flow: true
ha_platforms:
  - climate
---

Integrates Adax heater into Home Assistant.

You'll need the Account ID (which can be found in the Adax Wifi app, pressing 'Account'). You will also need a credential, which you can create in the Adax app:

1. Navigate to Account Tab,
2. Select “Remote user client API”
3. Select “Add Credential”
4. Give some name to the created credential and copy the generated password.

{% include integrations/config_flow.md %}
