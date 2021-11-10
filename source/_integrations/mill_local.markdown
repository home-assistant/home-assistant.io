---
title: Mill
description: Instructions on how to integrate Mill heater into Home Assistant.
ha_category:
  - Climate
ha_release: 2021.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: mill_local
ha_config_flow: true
ha_platforms:
  - climate
---

Integrates Mill heater into Home Assistant.

{% include integrations/config_flow.md %}

This uses your local network (no cloud) to control your heaters.
Requires Generation 3 heaters (Sold from Autumn 2021)
