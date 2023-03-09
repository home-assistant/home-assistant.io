---
title: Roborock
description: Instructions on how to integrate your Roborock vacuum with home assistant
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

The Roborock integration allows you to control your Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) vacuum while syncing everything from the Roborock app. The [Xiaomi Miio](https://www.home-assistant.io/integrations/xiaomi_miio/) integration can also control Roborock vacuums, but you must use the Mi home app instead of the Roborock app. This integration is currently cloud based, while the Xiaomi integration has the option of local control.

{% include integrations/config_flow.md %}
