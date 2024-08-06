---
title: Nice G.O.
description: Control Nice G.O. garage doors
ha_release: '2024.8'
ha_category:
  - Cover
  - Light
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: nice_go
ha_platforms:
  - cover
  - diagnostics
  - light
ha_integration_type: integration
---

The Nice G.O. integration lets you control Nice G.O. garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Nice G.O. mobile app.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Nice G.O. account will appear as covers.

## Light

Lights on your garage door will appear as lights.
