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

The Linear integration lets you control Linear garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Linear mobile app.

{% warning %}
Nice North America has begun informing users of the new Nice G.O. app, and dropping support for the Linear app in the coming weeks. Support for the new app will be added as a new integration.
Migrating now will cut off access to the old app and the integration will cease functioning for you.

For more information, refer to the [Nice G.O. migration documentation](https://na.niceforyou.com/features/nice-go-app/#migration).
{% endwarning %}

## Prerequisites

This integration is for garage doors connected to the cloud by Wi-Fi using the Linear mobile app.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Linear account will appear as covers.

## Light

Lights on your garage door will appear as lights.
