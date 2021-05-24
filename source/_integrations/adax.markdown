---
title: Adax
description: Instructions on how to integrate Adax heater into Home Assistant.
ha_category:
  - Climate
ha_release: 2021.7
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: adax
ha_config_flow: true
ha_platforms:
  - climate
---

Integrates Adax heater into Home Assistant.

You'll need the Account ID (which can be found in the Adax Wifi app, pressing 'Account'). You will also need a credential, which you can create in the 'Account' panel, selecting 'Remote user client API'. A new panel will open and you need to press 'Add credential', after which you should copy the password.

{% include integrations/config_flow.md %}
