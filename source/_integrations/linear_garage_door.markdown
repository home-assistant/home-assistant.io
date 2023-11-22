---
title: "Linear Garage Door"
description: "Control Linear garage doors"
ha_release: "2023.12"
ha_category:
  - Cover
ha_iot_class: "Cloud Polling"
ha_quality_scale: gold
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: linear_garage_door
---

The Linear integration lets you control Linear garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Linear mobile app.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Linear account will appear as covers.
