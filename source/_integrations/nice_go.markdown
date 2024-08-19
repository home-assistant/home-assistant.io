---
title: Nice G.O.
description: Control Nice G.O. garage doors
ha_release: '2024.9'
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

The **Nice G.O.** {% term integration %} lets you control Nice G.O. garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Nice G.O. mobile app.

Make sure you have a working account with the Nice G.O. app and have your email and password ready.
## Prerequisites

Make sure you have a working account with the Nice G.O. app and have your email and password ready.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Nice G.O. account will appear as covers.

## Light

Lights on your garage door will appear as lights.
