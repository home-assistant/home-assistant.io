---
title: Linear Garage Door
description: Control Linear garage doors
ha_release: '2023.12'
ha_category:
  - Cover
  - Light
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: linear_garage_door
ha_platforms:
  - cover
  - diagnostics
  - light
ha_integration_type: integration
---

{% warning %}
This integration is now deprecated and will be removed in 2025.8.0.
Please use the new [Nice G.O.](/integrations/nice_go) integration instead to avoid disruption.

For more information, refer to the [Nice G.O. migration documentation](https://na.niceforyou.com/features/nice-go-app/#migration).
{% endwarning %}

The Linear integration lets you control Linear garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Linear mobile app.

## Prerequisites

This integration is for garage doors connected to the cloud by Wi-Fi using the Linear mobile app.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Linear account will appear as covers.

## Light

Lights on your garage door will appear as lights.
