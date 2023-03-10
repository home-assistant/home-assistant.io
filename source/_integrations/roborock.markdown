---
title: Roborock
description: Instructions on how to integrate Roborock vacuums into Home Assistant
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 2023.4
ha_config_flow: true
ha_codeowners:
  - '@humbertogontijo'
  - '@Lash-L'
ha_domain: roborock
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The Roborock integration allows you to control your [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) vacuum while continuing to use the Roborock app.

In contrast to [Xiaomi Miio](/integrations/xiaomi_miio/) integration, this integration provides more complete support but requires cloud access and device configuration using the Roborock app.

{% include integrations/config_flow.md %}
